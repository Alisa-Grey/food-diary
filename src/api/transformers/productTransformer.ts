import { recommendedProductCode, unrecommendedProductCode } from '@/utils/variables';

import type { Product } from '../types';
import { ProductFieldsList } from '../types';

export const transformProductData = (data: Product) => {
  const productData = {
    ...data,
    [ProductFieldsList.recomendCode]: +data[ProductFieldsList.recomendCode],
    isRecomended: +data[ProductFieldsList.recomendCode] === recommendedProductCode,
    isUnrecommended: +data[ProductFieldsList.recomendCode] === unrecommendedProductCode,
  };

  return productData;
};
