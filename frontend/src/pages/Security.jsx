export default function Security() {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Security</h2>
      <p>
        Security is our top priority. We use encryption, secure authentication,
        and best practices to protect your data.
      </p>
      <ul className="list-disc ml-6 mt-2">
        <li>HTTPS/SSL for secure data transfer</li>
        <li>JWT-based authentication</li>
        <li>Password hashing and salting</li>
        <li>Validation against common attacks (SQLi, XSS, CSRF)</li>
      </ul>
    </div>
  )
}
