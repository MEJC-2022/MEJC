import { Box, Button, Group, TextInput, Title } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  zipCode: string;
  phoneNumber: string;
}

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name should have at least 2 letters')
    .required('This field is required'),
  lastName: Yup.string()
    .min(2, 'Last name should have at least 2 letters')
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email')
    .required('Email is required'),
  street: Yup.string()
    .min(2, 'Your street address should have at least 2 letters')
    .required('This field is required'),
  city: Yup.string()
    .min(2, 'Name should have at least 2 letters')
    .max(50, 'This field is too big')
    .required('This field is required'),
  zipCode: Yup.string()
    .min(5, 'this field should be 5 numbers long')
    .max(5, 'this field should be 5 numbers long')
    .required('This field is required'),
  phoneNumber: Yup.string()
    .min(10, 'Your phone number should be 10 numbers long')
    .max(10, 'Your phone number should be 10 numbers long')
    .required('This field is required'),
});

function CheckoutForm() {
  const navigate = useNavigate();
  const { addOrder, cartProducts } = useShoppingCart();
  const onSubmit = (data: FormValues) => {
    addOrder(cartProducts, data);
    navigate('/confirmation');
  };

  const form = useForm<FormValues>({
    validate: yupResolver(schema),
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      zipCode: '',
      phoneNumber: '',
      city: '',
    },
  });

  return (
    <Box
      sx={{
        width: '20.7rem',
        '@media(max-width:721px)': {
          flexDirection: 'column',
          width: '20rem',
        },
      }}
    >
      <Title mb="sm" order={1}>
        Your details
      </Title>
      <form onSubmit={form.onSubmit(onSubmit)} data-cy="customer-form">
        <TextInput
          sx={{ marginBottom: '0.6rem' }}
          autoComplete="given-name"
          withAsterisk
          label="First Name"
          placeholder="First Name"
          {...form.getInputProps('firstName')}
          data-cy="customer-name"
          errorProps={{ 'data-cy': 'customer-firstName-error' }}
        />
        <TextInput
          sx={{ marginBottom: '0.6rem' }}
          autoComplete="family-name"
          withAsterisk
          label="Last Name"
          placeholder="Last Name"
          {...form.getInputProps('lastName')}
          errorProps={{ 'data-cy': 'customer-lastName-error' }}
        />
        <TextInput
          sx={{ marginBottom: '0.6rem' }}
          autoComplete="email"
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
          errorProps={{ 'data-cy': 'customer-email-error' }}
          data-cy="customer-email"
        />
        <TextInput
          sx={{ marginBottom: '0.6rem' }}
          autoComplete="street-address"
          withAsterisk
          label="Street"
          placeholder="Bigboi Road 31"
          {...form.getInputProps('street')}
          data-cy="customer-address"
          errorProps={{ 'data-cy': 'customer-address-error' }}
        />
        <TextInput
          sx={{ marginBottom: '0.6rem' }}
          autoComplete="address-level2"
          withAsterisk
          label="City"
          placeholder="Gothenburg"
          {...form.getInputProps('city')}
          data-cy="customer-city"
          errorProps={{ 'data-cy': 'customer-city-error' }}
        />
        <TextInput
          sx={{ marginBottom: '0.6rem' }}
          autoComplete="postal-code"
          withAsterisk
          type="number"
          label="Zip Code"
          placeholder="43152"
          {...form.getInputProps('zipCode')}
          data-cy="customer-zipcode"
          errorProps={{ 'data-cy': 'customer-zipcode-error' }}
        />
        <TextInput
          sx={{ marginBottom: '2rem' }}
          autoComplete="tel"
          type="number"
          withAsterisk
          label="Phone Number"
          placeholder="0700415160"
          {...form.getInputProps('phoneNumber')}
          data-cy="customer-phone"
          errorProps={{ 'data-cy': 'customer-phone-error' }}
        />
        <Group position="right" mt="md" mb="md">
          <Button sx={{ width: '100%' }} type="submit">
            Place order
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default CheckoutForm;
