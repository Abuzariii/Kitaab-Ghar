"use client";

export default function FetchBooks() {
  const handleFetch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/check_books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error sending the request:", error.message);
    }
  };
  return (
    <div>
      <button onClick={handleFetch}>Fetch Books</button>
    </div>
  );
}
