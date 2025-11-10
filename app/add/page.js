"use client";
import { useEffect, useState } from 'react';
import { getDefaultProducts, storageKey } from '../../lib/products';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: 'Equipment',
    brand: ''
  });

  useEffect(() => {
    // No-op to ensure client hydration
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.imageUrl) return;
    setSubmitting(true);
    const defaults = getDefaultProducts();
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const next = [
      ...existing,
      {
        id: `local-${Date.now()}`,
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        imageUrl: form.imageUrl.trim(),
        category: form.category,
        brand: form.brand.trim(),
        likes: 0
      }
    ];
    localStorage.setItem(storageKey, JSON.stringify(next));
    setTimeout(() => {
      setSubmitting(false);
      router.push('/');
    }, 300);
  };

  return (
    <div>
      <h1>Add Healthcare Product</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="row">
          <div>
            <div className="label">Name</div>
            <input className="input" name="name" value={form.name} onChange={onChange} placeholder="Pulse Oximeter" required />
          </div>
          <div>
            <div className="label">Brand</div>
            <input className="input" name="brand" value={form.brand} onChange={onChange} placeholder="MediCare" />
          </div>
        </div>
        <div>
          <div className="label">Description</div>
          <textarea className="textarea" name="description" value={form.description} onChange={onChange} placeholder="Key features, usage, certification..." />
        </div>
        <div className="row">
          <div>
            <div className="label">Price (USD)</div>
            <input className="input" name="price" type="number" min="0" step="0.01" value={form.price} onChange={onChange} placeholder="49.99" required />
          </div>
          <div>
            <div className="label">Category</div>
            <select className="select" name="category" value={form.category} onChange={onChange}>
              <option>Equipment</option>
              <option>Wellness</option>
              <option>Diagnostics</option>
              <option>Supplements</option>
              <option>Personal Care</option>
            </select>
          </div>
        </div>
        <div>
          <div className="label">Image URL</div>
          <input className="input" name="imageUrl" value={form.imageUrl} onChange={onChange} placeholder="https://..." required />
          <div className="helper">Tip: Use square images for best results.</div>
        </div>
        <div style={{display:'flex', gap:12, justifyContent:'flex-end'}}>
          <a href="/" className="button">Cancel</a>
          <button disabled={submitting} className="button primary" type="submit">{submitting ? 'Saving?' : 'Add Product'}</button>
        </div>
      </form>
    </div>
  );
}
