/**
 * Builder Pattern para configurar Payment Brick do Mercado Pago
 *
 * @example
 * ```typescript
 * const brickConfig = new PaymentBrickBuilder()
 *   .withAmount(397)
 *   .withPayerEmail('cliente@example.com')
 *   .enableAllPaymentMethods()
 *   .withDarkTheme()
 *   .onSubmit(async (data) => {
 *     await processPayment(data);
 *   })
 *   .build();
 * ```
 */

import type {
  PaymentBrickSettings,
  PaymentBrickFormData,
  PaymentBrickInitialization,
  PaymentBrickCustomization,
  PaymentBrickCallbacks,
} from './types';

export class PaymentBrickBuilder {
  private initialization: PaymentBrickInitialization = {
    amount: 0,
  };

  private customization: PaymentBrickCustomization = {
    visual: {
      style: {
        theme: 'default',
      },
    },
    paymentMethods: {
      creditCard: 'all',
      debitCard: 'all',
      ticket: 'all',
      bankTransfer: 'all',
      mercadoPago: 'all',
    },
  };

  private callbacks: Partial<PaymentBrickCallbacks> = {};

  /**
   * Define o valor do pagamento (obrigatório)
   */
  withAmount(amount: number): this {
    if (amount <= 0) {
      throw new Error('[PaymentBrickBuilder] Amount deve ser maior que zero');
    }
    this.initialization.amount = amount;
    return this;
  }

  /**
   * Pré-preenche o email do pagador
   */
  withPayerEmail(email: string): this {
    if (!this.initialization.payer) {
      this.initialization.payer = {};
    }
    this.initialization.payer.email = email;
    return this;
  }

  /**
   * Pré-preenche nome do pagador
   */
  withPayerName(firstName: string, lastName: string): this {
    if (!this.initialization.payer) {
      this.initialization.payer = {};
    }
    this.initialization.payer.firstName = firstName;
    this.initialization.payer.lastName = lastName;
    return this;
  }

  /**
   * Pré-preenche documento do pagador
   */
  withPayerDocument(type: 'CPF' | 'CNPJ', number: string): this {
    if (!this.initialization.payer) {
      this.initialization.payer = {};
    }
    this.initialization.payer.identification = {
      type,
      number,
    };
    return this;
  }

  /**
   * Habilita todos os métodos de pagamento
   */
  enableAllPaymentMethods(): this {
    this.customization.paymentMethods = {
      creditCard: 'all',
      debitCard: 'all',
      ticket: 'all',
      bankTransfer: 'all',
      mercadoPago: 'all',
    };
    return this;
  }

  /**
   * Habilita apenas PIX
   */
  enableOnlyPix(): this {
    this.customization.paymentMethods = {
      creditCard: [],
      debitCard: [],
      ticket: [],
      bankTransfer: 'all',
      mercadoPago: [],
    };
    return this;
  }

  /**
   * Habilita apenas cartão de crédito
   */
  enableOnlyCreditCard(): this {
    this.customization.paymentMethods = {
      creditCard: 'all',
      debitCard: [],
      ticket: [],
      bankTransfer: [],
      mercadoPago: [],
    };
    return this;
  }

  /**
   * Habilita apenas PIX e cartão de crédito
   */
  enablePixAndCreditCard(): this {
    this.customization.paymentMethods = {
      creditCard: 'all',
      debitCard: [],
      ticket: [],
      bankTransfer: 'all',
      mercadoPago: [],
    };
    return this;
  }

  /**
   * Define número máximo de parcelas
   */
  withMaxInstallments(max: number): this {
    if (!this.customization.paymentMethods) {
      this.customization.paymentMethods = {};
    }
    this.customization.paymentMethods.maxInstallments = max;
    return this;
  }

  /**
   * Aplica tema escuro
   */
  withDarkTheme(): this {
    if (!this.customization.visual) {
      this.customization.visual = {};
    }
    if (!this.customization.visual.style) {
      this.customization.visual.style = {};
    }
    this.customization.visual.style.theme = 'dark';
    return this;
  }

  /**
   * Aplica tema padrão
   */
  withDefaultTheme(): this {
    if (!this.customization.visual) {
      this.customization.visual = {};
    }
    if (!this.customization.visual.style) {
      this.customization.visual.style = {};
    }
    this.customization.visual.style.theme = 'default';
    return this;
  }

  /**
   * Customiza cores do formulário
   */
  withCustomColors(colors: {
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
  }): this {
    if (!this.customization.visual) {
      this.customization.visual = {};
    }
    if (!this.customization.visual.style) {
      this.customization.visual.style = {};
    }
    if (!this.customization.visual.style.customVariables) {
      this.customization.visual.style.customVariables = {};
    }

    if (colors.primaryColor) {
      this.customization.visual.style.customVariables.baseColor = colors.primaryColor;
    }
    if (colors.backgroundColor) {
      this.customization.visual.style.customVariables.formBackgroundColor = colors.backgroundColor;
    }
    if (colors.textColor) {
      this.customization.visual.style.customVariables.textPrimaryColor = colors.textColor;
    }

    return this;
  }

  /**
   * Oculta título do formulário
   */
  hideTitle(): this {
    if (!this.customization.visual) {
      this.customization.visual = {};
    }
    this.customization.visual.hideFormTitle = true;
    return this;
  }

  /**
   * Oculta botão de pagamento (se você quiser usar um botão customizado)
   */
  hidePaymentButton(): this {
    if (!this.customization.visual) {
      this.customization.visual = {};
    }
    this.customization.visual.hidePaymentButton = true;
    return this;
  }

  /**
   * Callback quando formulário é submetido (obrigatório)
   */
  onSubmit(callback: (formData: PaymentBrickFormData) => Promise<void>): this {
    this.callbacks.onSubmit = callback;
    return this;
  }

  /**
   * Callback quando Brick está pronto
   */
  onReady(callback: () => void): this {
    this.callbacks.onReady = callback;
    return this;
  }

  /**
   * Callback quando ocorre erro
   */
  onError(callback: (error: any) => void): this {
    this.callbacks.onError = callback;
    return this;
  }

  /**
   * Callback quando BIN do cartão muda
   */
  onBinChange(callback: (bin: string) => void): this {
    this.callbacks.onBinChange = callback;
    return this;
  }

  /**
   * Constrói as configurações finais do Payment Brick
   */
  build(): PaymentBrickSettings {
    // Validações
    if (this.initialization.amount <= 0) {
      throw new Error('[PaymentBrickBuilder] Amount é obrigatório e deve ser maior que zero');
    }

    if (!this.callbacks.onSubmit) {
      throw new Error('[PaymentBrickBuilder] onSubmit callback é obrigatório');
    }

    return {
      initialization: this.initialization,
      customization: this.customization,
      callbacks: this.callbacks as PaymentBrickCallbacks, // Cast seguro após validação
    };
  }
}

/**
 * Helper para criar builder com configuração padrão para Projeto 45 Graus
 */
export function createProjeto45DiasCheckout(amount: number = 397) {
  return new PaymentBrickBuilder()
    .withAmount(amount)
    .enableAllPaymentMethods()
    .withMaxInstallments(12)
    .withDefaultTheme();
}
