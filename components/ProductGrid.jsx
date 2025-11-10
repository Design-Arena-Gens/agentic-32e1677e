"use client";
import { useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { storageKey } from '../lib/products';

export default function ProductGrid({ defaultProducts }) {
  const [localProducts, setLocalProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setLocalProducts(stored);
  }, []);

  const products = useMemo(() => {
    const all = [...defaultProducts, ...localProducts];
    const q = query.trim().toLowerCase();
    const filtered = all.filter((p) => {
      const matchesQ = !q || [p.name, p.brand, p.category, p.description]
        .filter(Boolean)
        .some((s) => String(s).toLowerCase().includes(q));
      const matchesCat = category === 'All' || p.category === category;
      return matchesQ && matchesCat;
    });
    return filtered;
  }, [defaultProducts, localProducts, query, category]);

  return (
    <div>
      <div style={{display:'flex', gap:12, alignItems:'center', marginBottom:16}}>
        <input
          className="input"
          placeholder="Search products, brands, categories"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
        <select className="select" value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option>All</option>
          <option>Equipment</option>
          <option>Wellness</option>
          <option>Diagnostics</option>
          <option>Supplements</option>
          <option>Personal Care</option>
        </select>
      </div>
      {products.length === 0 ? (
        <div className="empty">No products found. Try different keywords or add a new product.</div>
      ) : (
        <section className="grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>
      )}
    </div>
  );
}
