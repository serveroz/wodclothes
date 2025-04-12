import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const StyledList = styled(List)(({ theme }) => ({
  width: '250px',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
}));

const CategoryContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

const categories = [
  'Crop Tops',
  'T-Shirts',
  'Hoodies',
  'Pants',
  'Shorts',
  'Accessories'
];

interface NavigationMenuProps {
  onToggle?: (isOpen: boolean) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ onToggle }) => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    const newState = !open;
    setOpen(newState);
    onToggle?.(newState);
  };

  return (
    <>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 250,
            transition: 'width 0.3s ease-in-out',
            zIndex: 1200,
            overflowX: 'hidden',
          },
        }}
      >
        <StyledList>
          <CategoryContainer>
            <CategoryTitle variant="h6">Categories</CategoryTitle>
            {categories.map((category) => (
              <ListItem key={category} disablePadding>
                <ListItemButton>
                  <ListItemText primary={category} />
                </ListItemButton>
              </ListItem>
            ))}
          </CategoryContainer>
          <Button
            onClick={toggleDrawer}
            variant="outlined"
            sx={{
              mt: 2,
              mb: 2,
              width: '100%',
            }}
          >
            {open ? 'Hide Menu' : 'Show Menu'}
          </Button>
        </StyledList>
      </Drawer>
      {!open && (
        <Button
          onClick={toggleDrawer}
          variant="contained"
          sx={{
            position: 'fixed',
            left: 20,
            top: '50%',
            transform: 'translateY(-50%) rotate(-90deg)',
            transformOrigin: 'left center',
            zIndex: 1300,
          }}
        >
          Toggle Menu
        </Button>
      )}
    </>
  );
};

export default NavigationMenu; 