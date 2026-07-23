import type { ILLMProvider } from "./baseProvider";
import { MockLLMProvider } from "./mockProvider";
import { OpenAIProvider } from "./openAIProvider";
import { AnthropicProvider } from "./anthropicProvider";
import { GeminiProvider } from "./geminiProvider";
import { OpenRouterProvider } from "./openRouterProvider";
import { OllamaProvider } from "./ollamaProvider";

export class ProviderRegistry {
  private static providers: Map<string, ILLMProvider> = new Map();
  private static activeProviderId: string = "mock-local";

  static {
    ProviderRegistry.register(new MockLLMProvider());
    ProviderRegistry.register(new OpenAIProvider());
    ProviderRegistry.register(new AnthropicProvider());
    ProviderRegistry.register(new GeminiProvider());
    ProviderRegistry.register(new OpenRouterProvider());
    ProviderRegistry.register(new OllamaProvider());
  }

  public static register(provider: ILLMProvider): void {
    ProviderRegistry.providers.set(provider.id, provider);
  }

  public static get(id: string): ILLMProvider | undefined {
    return ProviderRegistry.providers.get(id);
  }

  public static getActive(): ILLMProvider {
    return ProviderRegistry.providers.get(ProviderRegistry.activeProviderId) || new MockLLMProvider();
  }

  public static setActive(id: string): boolean {
    if (ProviderRegistry.providers.has(id)) {
      ProviderRegistry.activeProviderId = id;
      return true;
    }
    return false;
  }

  public static listAll(): ILLMProvider[] {
    return Array.from(ProviderRegistry.providers.values());
  }
}
