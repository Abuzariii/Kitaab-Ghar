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
        body: JSON.stringify({ id: "65bfa1f4f433864b6f7a18d6" }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.book);
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
