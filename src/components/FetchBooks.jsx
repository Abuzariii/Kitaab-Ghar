"use client";

export default function FetchBooks() {
  const handleFetch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/get_books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.books);
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
