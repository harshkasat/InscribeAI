export function getEmailFromLocalStorage() {
    try {
      const savedEmail = localStorage.getItem("user_email");
      const expiry = localStorage.getItem("user_email_expiry");
      
      if (savedEmail && expiry && new Date().getTime() < parseInt(expiry)) {
        return savedEmail;
      }
      return "";
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return "";
    }
  }