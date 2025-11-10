"use client";
import Image from 'next/image';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [likes, setLikes] = useState(product.likes || 0);
  const onLike = () => setLikes((n) => n + 1);

  return (
    <article className="card">
      <div className="card-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.imageUrl} alt={product.name} loading="lazy" />
      </div>
      <div className="card-body">
        <div className="card-title">
          <h3 title={product.name}>{product.name}</h3>
          <div className="price">${product.price.toFixed(2)}</div>
        </div>
        <div className="meta">
          {product.brand ? `${product.brand} ? ` : ''}{product.category}
        </div>
        {product.description ? (
          <div className="meta" style={{lineClamp:2, WebkitLineClamp:2, display:'-webkit-box', WebkitBoxOrient:'vertical', overflow:'hidden'}}>
            {product.description}
          </div>
        ) : null}
        <div className="actions">
          <button className="button" onClick={onLike}>?? {likes}</button>
          <a className="button" href="#" onClick={(e)=>e.preventDefault()}>Details</a>
        </div>
      </div>
    </article>
  );
}
