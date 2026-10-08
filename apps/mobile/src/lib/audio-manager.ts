import { Platform } from 'react-native';
import * as Speech from 'expo-speech';

export type AudioPriority = 'critical' | 'high' | 'normal' | 'low';

const PRIORITY_WEIGHTS: Record<AudioPriority, number> = {
  critical: 4,
  high: 3,
  normal: 2,
  low: 1,
};

export interface AudioSpeakOptions {
  text: string;
  priority?: AudioPriority;
  language?: string;
  pitch?: number;
  rate?: number;
  delayMs?: number;
  onStart?: () => void;
  onDone?: () => void;
  onError?: (error?: any) => void;
}

interface ActiveAudioTask {
  id: string;
  priority: AudioPriority;
  text: string;
  timer?: ReturnType<typeof setTimeout>;
  onDone?: () => void;
  onError?: (error?: any) => void;
}

class AudioManager {
  private activeTask: ActiveAudioTask | null = null;
  private isSpeaking = false;
  private listeners = new Set<(isSpeaking: boolean) => void>();
  private taskIdCounter = 0;

  /**
   * Reproduce texto utilizando TTS coordinado con jerarquía de prioridades.
   */
  public speak(options: AudioSpeakOptions): string {
    const {
      text,
      priority = 'normal',
      language = 'es-VE',
      pitch = 1.05,
      rate = 0.95,
      delayMs,
      onStart,
      onDone,
      onError,
    } = options;

    const trimmed = text.trim();
    if (!trimmed) {
      onDone?.();
      return '';
    }

    const currentPriorityWeight = this.activeTask
      ? PRIORITY_WEIGHTS[this.activeTask.priority]
      : 0;
    const incomingPriorityWeight = PRIORITY_WEIGHTS[priority];

    // Si hay una locución en curso de mayor prioridad, rechazamos o descartamos la entrante
    if (this.isSpeaking && this.activeTask && incomingPriorityWeight < currentPriorityWeight) {
      onError?.(new Error('Rejected by higher priority speech'));
      return '';
    }

    // Cancelar la tarea activa actual si la entrante tiene igual o mayor prioridad
    this.cancelActiveTask();

    const taskId = `task_${++this.taskIdCounter}_${Date.now()}`;
    const newTask: ActiveAudioTask = {
      id: taskId,
      priority,
      text: trimmed,
      onDone,
      onError,
    };
    this.activeTask = newTask;

    // Delay recomendado para Android (especialmente primera locución o cambio de pantalla)
    const effectiveDelay = delayMs !== undefined
      ? delayMs
      : Platform.OS === 'android'
        ? 280
        : 60;

    // Detener cualquier audio previo con colchón de tiempo seguro en Android para evitar race conditions
    Speech.stop();

    newTask.timer = setTimeout(() => {
      if (this.activeTask?.id !== taskId) return;

      this.isSpeaking = true;
      this.notify();
      onStart?.();

      try {
        Speech.speak(trimmed, {
          language,
          pitch,
          rate,
          onDone: () => {
            if (this.activeTask?.id === taskId) {
              this.isSpeaking = false;
              this.activeTask = null;
              this.notify();
              onDone?.();
            }
          },
          onError: (err) => {
            if (this.activeTask?.id === taskId) {
              this.isSpeaking = false;
              this.activeTask = null;
              this.notify();
              onError?.(err);
            }
          },
        });
      } catch (err) {
        if (this.activeTask?.id === taskId) {
          this.isSpeaking = false;
          this.activeTask = null;
          this.notify();
          onError?.(err);
        }
      }
    }, effectiveDelay);

    return taskId;
  }

  /**
   * Detiene cualquier locución activa de inmediato.
   */
  public stop(): void {
    this.cancelActiveTask();
    try {
      Speech.stop();
    } catch {}
    this.isSpeaking = false;
    this.notify();
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  public subscribe(listener: (isSpeaking: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isSpeaking);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private cancelActiveTask(): void {
    if (this.activeTask?.timer) {
      clearTimeout(this.activeTask.timer);
    }
    this.activeTask = null;
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener(this.isSpeaking);
    }
  }
}

export const audioManager = new AudioManager();
