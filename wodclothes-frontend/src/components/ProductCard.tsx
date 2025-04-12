import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, Button, Box, CardMedia } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface ProductCardProps {
  name: string;
  price: number;
  image?: string;
  onViewDetails: () => void;
  onAddToCart: () => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(30, 30, 30, 0.9)',
  borderRadius: theme.spacing(2),
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  width: '100%',
  height: '200px',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '200px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: theme.spacing(1),
}));

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image, onViewDetails, onAddToCart }) => {
  return (
    <StyledCard>
      {image ? (
        <ProductImage
          image={image}
          title={name}
          sx={{ backgroundSize: 'contain' }}
        />
      ) : (
        <IconContainer>
          <BookmarkIcon sx={{ fontSize: 64, color: 'white' }} />
        </IconContainer>
      )}
      <CardContent sx={{ width: '100%', padding: 0 }}>
        <Typography variant="h6" component="div" sx={{ color: 'white', textAlign: 'center', mb: 1 }}>
          {name}
        </Typography>
        <Typography variant="body1" sx={{ color: 'white', textAlign: 'center', mb: 2 }}>
          ${price.toFixed(2)}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Button
          variant="contained"
          onClick={onViewDetails}
          sx={{
            backgroundColor: 'white',
            color: 'black',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            },
          }}
        >
          View Details
        </Button>
        <Button
          variant="contained"
          onClick={onAddToCart}
          sx={{
            backgroundColor: 'white',
            color: 'black',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            },
          }}
        >
          Add to Cart
        </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard; 