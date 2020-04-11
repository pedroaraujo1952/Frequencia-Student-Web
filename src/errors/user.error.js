export default class Error {
  constructor(error) {
    this.code = error.code;
    this.type = this.getErrorType(this.code);
    this.message = this.getErrorMessage(this.code);
  }

  get getError() {
    return {
      type: this.type,
      message: this.message,
      code: this.code
    };
  }

  getErrorType(code) {
    if (code.includes("email")) {
      return "EMAIL_ERROR";
    } else if (code.includes("password")) {
      return "PSWD_ERROR";
    } else if (code === "auth/user-not-found") {
      return "EMAIL_ERROR";
    } else {
      return "GENERAL_ERROR";
    }
  }

  getErrorMessage(code) {
    switch (code) {
      case "auth/invalid-email":
        return "Email inválido";

      case "auth/wrong-password":
        return "Senha inválida";

      case "auth/user-disabled":
        return "Conta desabilitada";

      case "auth/user-not-found":
        return "Usuário não encontrado";

      case "auth/weak-password":
        return "Senha fraca";

      case "auth/email-already-in-use":
        return "Este email já está em uso";

      case "auth/operation-not-allowed":
        return "Contate o administrador do sistema";

      case "auth/wrong-confirm-password":
        return "Por favor, verifique se as senhas inseridas estão corretas";

      case "auth/missing-continue-uri":
        return "Contate o administrador do sistema";

      case "auth/invalid-continue-uri":
        return "Contate o administrador do sistema";

      case "auth/unauthorized-continue-uri":
        return "Contate o administrador do sistema";

      case "auth/unauthorized-domain":
        return "Você está tentando criar um conta com um domínio não permitido\nCaso você não seja professor, esta aplicação não é pra você";

      default:
        return "Contate o administrador do sistema";
    }
  }
}
