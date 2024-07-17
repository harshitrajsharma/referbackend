interface ReferralData {
    yourName: string;
    name: string;
    email: string;
    phone?: string;
    message?: string;
  }
  
  export function validateReferralData(data: ReferralData): string | null {
    if (!data.yourName || data.yourName.trim() === '') {
      return 'Your Name is required';
    }

    if (!data.name || data.name.trim() === '') {
      return 'Name is required';
    }
  
    if (!data.email || !isValidEmail(data.email)) {
      return 'Valid email is required';
    }
  
    if (data.phone && !isValidPhone(data.phone)) {
      return 'Invalid phone number format';
    }
  
    return null;
  }
  
  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  }