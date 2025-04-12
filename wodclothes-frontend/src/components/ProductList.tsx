import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ProductCard from './ProductCard';
import NavigationMenu from './NavigationMenu';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const ProductGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: 'repeat(2, 1fr)',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

const LoadingContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
});

const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
  transition: 'all 0.3s ease-in-out',
}));

const MainContent = styled(Box)<{ isMenuOpen: boolean }>(({ theme, isMenuOpen }) => ({
  flex: 1,
  transition: 'all 0.3s ease-in-out',
  marginLeft: isMenuOpen ? 0 : -250,
  width: '100%',
}));

const LoadMoreButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  width: '200px',
}));

const LoadMoreContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

const PRODUCTS_PER_PAGE = 8;

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (pageNum: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/getAll?page=${pageNum}&limit=${PRODUCTS_PER_PAGE}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      
      if (!data || !data.products) {
        throw new Error('Invalid response format from server');
      }

      if (pageNum === 1) {
        setProducts(data.products);
      } else {
        setProducts(prev => [...prev, ...data.products]);
      }
      
      setHasMore(data.hasMore ?? data.products.length === PRODUCTS_PER_PAGE);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchProducts(nextPage);
  };

  const handleAddToCart = (productId: string) => {
    console.log(`Added product ${productId} to cart`);
  };

  const handleViewDetails = (productId: string) => {
    console.log(`Viewing details for product ${productId}`);
  };

  const handleMenuToggle = (open: boolean) => {
    setIsMenuOpen(open);
  };

  if (loading) {
    return (
      <StyledContainer>
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      </StyledContainer>
    );
  }

  if (error) {
    return (
      <StyledContainer>
        <Alert severity="error">{error}</Alert>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Crop Tops
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <ContentContainer>
        <NavigationMenu onToggle={handleMenuToggle} />
        <MainContent isMenuOpen={isMenuOpen}>
          <ProductGrid>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
                onAddToCart={() => handleAddToCart(product._id)}
                onViewDetails={() => handleViewDetails(product._id)}
              />
            ))}
          </ProductGrid>
          {hasMore && (
            <LoadMoreContainer>
              <LoadMoreButton
                variant="contained"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'View More Products'
                )}
              </LoadMoreButton>
            </LoadMoreContainer>
          )}
        </MainContent>
      </ContentContainer>
    </StyledContainer>
  );
};

export default ProductList; 