export default defineNuxtPlugin(() => {
    const nuxtApp = useNuxtApp();
  
    if (nuxtApp.isClient) {
      // Remove the 'dark' class from <html> and <body> elements
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
  
      // Optionally, clear dark mode preference from localStorage
      localStorage.removeItem('darkMode');
    }
  });