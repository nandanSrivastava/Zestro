const useSignup = () => {
  const signup = async (userData) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Signup failed");
      }
      return await response.json();
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  };
  return { signup };
};
