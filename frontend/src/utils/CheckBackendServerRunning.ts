import { toast } from "sonner";


const BASE_URL = import.meta.env.VITE_PROD_URL || "http://127.0.0.1:8000"

const checkBackendServerRunning = async () => {
    let attempts = 0;
    const maxAttempts = 40;
    
    const tryConnect = async () => {
      try {
        const response = await fetch(`${BASE_URL}`, {
          method: "GET",
          headers: {
            "accept": "application/json"
          },
        });
        
        if (!response.ok) {
          throw new Error(`Backend server error: ${response.status} ${response.statusText}`);
        }
        toast('Connected to backend server');
        console.log('Connected to backend server: ' + BASE_URL);

        return true;
      } catch (error) {
        attempts++;
        if (attempts >= maxAttempts) {
          if (error instanceof TypeError && error.message.includes('fetch')) {
            toast.error('Cannot connect to backend server after 40 seconds. Please ensure it is running.');
          } else {
            toast.error('Unexpected error connecting to backend');
          }
          console.error('Backend connection error:', error);
          return false;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        return tryConnect();
      }
    };
  
    await tryConnect();
  }

export default checkBackendServerRunning;