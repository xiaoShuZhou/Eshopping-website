import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { removeFromCart, increaseQuantity, decreaseQuantity, emptyCart } from '../redux/slices/cartSlice';
import { RootState } from '../redux/store'; // Adjust the path as needed
import { Button, Grid, Card, CardContent, Typography, CardActions, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { getImageUrl } from '../misc/uploadFileService';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  const handleCheckout = () => {
    dispatch(emptyCart());
    window.alert("Successfully shopping!");
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Box sx={{ flexGrow: 1, padding: '20px' }}>
      <Grid container spacing={3} justifyContent="flex-start" alignItems="flex-start">
        <Grid container item xs={12} sm={8} spacing={3}>
          {cartItems.map((item) => (
            <Grid item xs={12} sm={6} lg={4} key={item.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    ${item.price} x {item.quantity}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                    <img src={getImageUrl(item.images[0])} alt={item.title} style={{ width: '100%', height: 'auto', maxWidth: '100px', maxHeight: '100px' }} />
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleIncreaseQuantity(item.id)} aria-label="increase">
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDecreaseQuantity(item.id)} aria-label="decrease">
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveFromCart(item.id)} aria-label="remove">
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: '20px', height: 'fit-content' }}>
            <Typography variant="h6" gutterBottom>
              Total Items: {totalItems}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Total Price: ${totalPrice.toFixed(2)}
            </Typography>
            <Button variant="contained" color="primary" fullWidth onClick={handleCheckout}>
              Checkout
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
