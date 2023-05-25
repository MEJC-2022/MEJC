import { Box, Button, Group, MultiSelect, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Category, Product } from '../contexts/ProductContext';

interface FormValues {
  _id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  categories: string[];
}

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  addProduct: (product: Product) => void;
  isEditing: boolean;
  product?: Product;
}

const schema = Yup.object().shape({
  categories: Yup.array()
    .of(Yup.string().required('Category is required'))
    .required('At least one category is required'),
  image: Yup.string(),
  title: Yup.string()
    .min(2, 'Title should have at least 2 letters')
    .required('Title is required'),
  description: Yup.string()
    .min(5, 'Description should have at least 5 letters')
    .required('Description is required'),
  price: Yup.number()
    .min(1, 'Nothing is this cheap...')
    .required('Price is required')
    .strict(),
});

function ProductForm({
  onSubmit,
  addProduct,
  isEditing,
  product,
}: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    validate: yupResolver(schema),
    initialValues: {
      _id: '',
      categories: [],
      image: '',
      title: '',
      description: '',
      price: '' as any,
      stock: '' as any,
    },
  });

  useEffect(() => {
    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    if (isEditing && product) {
      form.setValues({
        ...product,
        categories: product.categories.map((category) => category._id),
      });
    }
  }, [product, isEditing, form.setValues]);

  const handleSubmit = (values: FormValues) => {
    const editedProduct = {
      ...values,
      categories: categories.filter((category) =>
        values.categories.includes(category._id),
      ),
    };
    if (isEditing) {
      onSubmit(editedProduct);
    } else {
      addProduct(editedProduct);
    }
    form.reset();
    navigate('/admin');
  };

  return (
    <Box maw={300} mx="auto">
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        data-cy="product-form"
        id="product-form"
      >
        <TextInput
          withAsterisk
          label="Title"
          placeholder="ComputerBook 2000"
          {...form.getInputProps('title')}
          data-cy="product-title"
          errorProps={{ 'data-cy': 'product-title-error' }}
        />
        <MultiSelect
          data={categories.map((category) => ({
            value: category._id,
            label: category.title,
          }))}
          label="Categories"
          placeholder="Select categories"
          searchable={false}
          {...form.getInputProps('categories')}
        />
        <TextInput
          withAsterisk
          label="Image URL"
          placeholder="https://www.image.com/image1.png"
          {...form.getInputProps('image')}
          data-cy="product-image"
          errorProps={{ 'data-cy': 'product-image-error' }}
        />
        <TextInput
          withAsterisk
          label="Description"
          placeholder="This is the description of this product."
          {...form.getInputProps('description')}
          data-cy="product-description"
          errorProps={{ 'data-cy': 'product-description-error' }}
        />
        <TextInput
          withAsterisk
          type="number"
          label="Price"
          placeholder="1000"
          {...form.getInputProps('price')}
          onChange={(e) => form.setFieldValue('price', Number(e.target.value))}
          data-cy="product-price"
          errorProps={{ 'data-cy': 'product-price-error' }}
        />
        <TextInput
          withAsterisk
          type="number"
          label="Stock"
          placeholder="10"
          {...form.getInputProps('stock')}
          onChange={(e) => form.setFieldValue('stock', Number(e.target.value))}
        />
        <Group mt="xl">
          <Button type="submit">
            {isEditing ? 'Save changes' : 'Add new Product'}
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default ProductForm;
