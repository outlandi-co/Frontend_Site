import  { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const FormWithSignature = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const sigCanvas = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    sigCanvas.current.clear();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signature = sigCanvas.current.toDataURL(); // Get the signature as a Base64 image
    const payload = { ...formData, signature };

    try {
      const response = await fetch('http://localhost:5001/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
        alert('Form submitted successfully!');
      } else {
        alert('Failed to submit the form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2>Fill out the form and sign below:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </label>
        <label>
          Message:
          <textarea name="message" value={formData.message} onChange={handleInputChange} required />
        </label>
        <h3>Signature:</h3>
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
        />
        <button type="button" onClick={handleClear}>Clear Signature</button>
        <button type="submit">Submit</button>
      </form>
      {submitted && <p>Thank you for submitting the form!</p>}
    </div>
  );
};

export default FormWithSignature;
