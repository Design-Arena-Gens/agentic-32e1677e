import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import { getDefaultProducts } from '../lib/products';

export const dynamic = 'force-static';

export default function Page() {
  const defaults = getDefaultProducts();
  return (
    <div>
      <div className="hero">
        <SearchBar />
      </div>
      <ProductGrid defaultProducts={defaults} />
    </div>
  );
}
