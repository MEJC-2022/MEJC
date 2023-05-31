import {
  Box,
  Button,
  Flex,
  Group,
  MultiSelect,
  Text,
  TextInput,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { useForm, yupResolver } from '@mantine/form';
import { IconPhoto } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Category, Product } from '../contexts/ProductContext';

interface FormValues {
  _id?: string;
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
    .test(
      'categories',
      'At least one category is required',
      (value) => value && value.length > 0,
    ),
  image: Yup.string().required('Image is required'),
  title: Yup.string()
    .min(2, 'Title should have at least 2 letters')
    .required('Title is required'),
  description: Yup.string()
    .min(5, 'Description should have at least 5 letters')
    .required('Description is required'),
  price: Yup.number()
    .min(1, 'Nothing is this cheap...')
    .max(99999, 'Nothing is this expensive...')
    .required('Price is required')
    .typeError('Price is required and must be a number')
    .strict(),
  stock: Yup.number()
    .min(0, 'Stock cannot be negative')
    .required('Stock is required')
    .typeError('Stock must be a number')
    .integer('Stock must be an integer'),
});

function ProductForm({
  onSubmit,
  addProduct,
  isEditing,
  product,
}: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFileUploaded, setFileUploaded] = useState(false);
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    validate: yupResolver(schema),
    initialValues:
      isEditing && product
        ? {
            ...product,
            categories: product.categories.map((category) => category._id),
          }
        : {
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

  useEffect(() => {
    if (isEditing && product && product.image) {
      setFileUploaded(true);
    }
  }, [product, isEditing]);

  const handleSubmit = (values: Partial<FormValues>) => {
    let editedProduct;

    if (isEditing) {
      editedProduct = {
        ...values,
        categories: categories.filter((category) =>
          (values.categories || []).includes(category._id),
        ),
      };
    } else {
      const { _id, ...restValues } = values;
      editedProduct = {
        ...restValues,
        categories: categories.filter((category) =>
          (values.categories || []).includes(category._id),
        ),
      };
    }

    if (isEditing) {
      onSubmit(editedProduct as Product);
    } else {
      addProduct(editedProduct as Product);
    }
    form.reset();
    navigate('/admin');
  };

  const handleFileChange = async (file: File | null) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch('/api/file', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const result = await response.json();

      form.setFieldValue('image', result);
      setFileUploaded(true);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const handleDrop = (acceptedFiles: File[]) => {
    handleFileChange(acceptedFiles[0]);
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
          error={form.errors.categories}
        />
        <Dropzone
          mt="0.5rem"
          onDrop={handleDrop}
          multiple={false}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Flex gap={1}>
            <IconPhoto stroke="1.3" />
            {isFileUploaded ? (
              <Text size="sm">Drag image here or click to change file</Text>
            ) : (
              <Text size="sm">Drag image here or click to add file</Text>
            )}
          </Flex>
        </Dropzone>
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
          error={form.errors.price}
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
