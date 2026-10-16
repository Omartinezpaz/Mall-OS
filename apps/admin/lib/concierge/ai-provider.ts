import type { AiProvider } from './types';

/**
 * Registro de proveedores de Inteligencia Artificial para el Concierge de Mall OS.
 * Cumple con RULES.md §7: desacopla la implementación de Gemini permitiendo
 * sustituciones, mocks para testing o proveedores alternativos sin afectar el endpoint.
 */
class AiProviderRegistry {
  private providers = new Map<string, AiProvider>();
  private defaultProviderName: string = 'gemini';

  public register(provider: AiProvider): void {
    this.providers.set(provider.name, provider);
  }

  public get(name?: string): AiProvider {
    const targetName = name || this.defaultProviderName;
    const provider = this.providers.get(targetName);
    if (!provider) {
      throw new Error(`AiProvider "${targetName}" no está registrado en AiProviderRegistry.`);
    }
    return provider;
  }

  public setDefault(name: string): void {
    if (!this.providers.has(name)) {
      throw new Error(`No se puede fijar "${name}" como predeterminado porque no está registrado.`);
    }
    this.defaultProviderName = name;
  }
}

export const aiProviderRegistry = new AiProviderRegistry();
