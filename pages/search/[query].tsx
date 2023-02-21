import { NextPage, GetServerSideProps } from 'next';

import { Typography, Box } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {

  return (
    <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Encontra los mejores productos de Teslo acá'}>
      <Typography variant='h1' component='h1'>Buscar productos</Typography>

      {
        foundProducts
        ? <Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize'>Término: { query }</Typography>
        : (
          <Box display='flex'>
            <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningún producto</Typography>
            <Typography variant='h2' sx={{ ml: 1 }} color='secondary' textTransform='capitalize'>{ query }</Typography>
          </Box>
        )
      }
      
      <ProductList products={ products } />

    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
  const { query = '' } = params as { query: string }; 

  if ( query.length === 0 ) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  let products = await dbProducts.getProductByTerm( query );
  const foundProducts = products.length > 0;

  // TODO: retornar otros productos
  if ( !foundProducts ) {
    products = await dbProducts.getProductByTerm('shirts');
  }

  return {
    props: {
      products,
      foundProducts,
      query
    }
  }
}

export default SearchPage;