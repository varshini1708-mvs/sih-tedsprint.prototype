import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductProfile, FairPriceBreakdown } from '../types';
import { ApiService } from '../api/client';

interface ProductContextType {
  products: ProductProfile[];
  currentProduct: ProductProfile;
  isDemoModalOpen: boolean;
  isGeneratingCatalogue: boolean;
  isCalculatingPrice: boolean;
  fairPriceBreakdown: FairPriceBreakdown | null;
  showPriceBreakdown: boolean;
  statusText: string;
  error: string | null;

  openDemoModal: () => void;
  startNewProduct: (openModal?: boolean) => void;
  closeDemoModal: () => void;
  setCurrentProduct: React.Dispatch<React.SetStateAction<ProductProfile>>;
  updateCurrentProduct: (delta: Partial<ProductProfile>) => void;
  generateCatalogue: () => Promise<void>;
  calculateFairPrice: (materialCost?: number, laborCost?: number, extraCharges?: number) => Promise<void>;
  setShowPriceBreakdown: (show: boolean) => void;
  addProductToList: (product: ProductProfile) => void;
}

const INITIAL_PRODUCTS: ProductProfile[] = [];

const DEFAULT_CURRENT_PRODUCT: ProductProfile = {
  title: '',
  category: '',
  material: '',
  craft: '',
  description: '',
  workDays: '',
  imageUrl: '',
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductProfile[]>(() => {
    const saved = localStorage.getItem('tedkraftProducts');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [currentProduct, setCurrentProduct] = useState<ProductProfile>(() => {
    const saved = localStorage.getItem('tedkraftProduct');
    return saved ? JSON.parse(saved) : DEFAULT_CURRENT_PRODUCT;
  });

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isGeneratingCatalogue, setIsGeneratingCatalogue] = useState(false);
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);
  const [fairPriceBreakdown, setFairPriceBreakdown] = useState<FairPriceBreakdown | null>(null);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [statusText, setStatusText] = useState('WAITING');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('tedkraftProducts', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('tedkraftProduct', JSON.stringify(currentProduct));
  }, [currentProduct]);

  const startNewProduct = (openModal: boolean = true) => {
    console.log('[ProductContext] Starting a NEW product. Initializing fresh ProductProfile.');
    setCurrentProduct(DEFAULT_CURRENT_PRODUCT);
    setFairPriceBreakdown(null);
    setShowPriceBreakdown(false);
    setStatusText('WAITING');
    setError(null);
    localStorage.removeItem('tedkraftProduct');
    if (openModal) {
      setIsDemoModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const openDemoModal = () => {
    setIsDemoModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const updateCurrentProduct = (delta: Partial<ProductProfile>) => {
    setCurrentProduct((prev) => {
      const merged = { ...prev };
      (Object.keys(delta) as Array<keyof ProductProfile>).forEach((key) => {
        const val = delta[key];
        if (val !== undefined && val !== null && val !== '') {
          (merged as any)[key] = val;
        }
      });
      return merged;
    });
  };

  const generateCatalogue = async () => {
    setIsGeneratingCatalogue(true);
    setStatusText('ANALYSING...');
    setError(null);

    // Check if essential fields are present
    const missing: string[] = [];
    if (!currentProduct.title || !currentProduct.title.trim()) missing.push('title');
    if (!currentProduct.category || !currentProduct.category.trim()) missing.push('category');
    if (!currentProduct.material || !currentProduct.material.trim()) missing.push('material');
    if (!currentProduct.craft || !currentProduct.craft.trim()) missing.push('craft');
    if (!currentProduct.description || !currentProduct.description.trim()) missing.push('description');
    if (!currentProduct.workDays || !currentProduct.workDays.trim()) missing.push('creation time');

    if (missing.length > 0) {
      setIsGeneratingCatalogue(false);
      setStatusText('INTERVIEW REQUIRED — MISSING INFO');
      setError(`Please click START AI INTERVIEW above to provide missing information (${missing.join(', ')}) before generating catalogue.`);
      return;
    }

    try {
      const result = await ApiService.generateCatalogue(currentProduct);
      if (result.success && result.catalogue) {
        setCurrentProduct((prev) => ({
          ...prev,
          ...result.catalogue,
        }));
        setStatusText('GENERATED ✓');
      } else {
        setError(result.error || 'Unable to generate catalogue.');
        setStatusText('ERROR');
      }
    } catch (err: any) {
      setError(err.message || 'Error communicating with AI Catalogue service.');
      setStatusText('ERROR');
    } finally {
      setIsGeneratingCatalogue(false);
    }
  };

  const calculateFairPrice = async (materialCost?: number, laborCost?: number, extraCharges?: number) => {
    setIsCalculatingPrice(true);
    setError(null);
    try {
      const result = await ApiService.getFairPrice(currentProduct, materialCost, laborCost, extraCharges);
      if (result.success && result.breakdown) {
        setFairPriceBreakdown(result.breakdown);
        setShowPriceBreakdown(true);
      }
    } catch (err: any) {
      setError('Unable to calculate fair price.');
    } finally {
      setIsCalculatingPrice(false);
    }
  };

  const addProductToList = (newProduct: ProductProfile) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        currentProduct,
        isDemoModalOpen,
        isGeneratingCatalogue,
        isCalculatingPrice,
        fairPriceBreakdown,
        showPriceBreakdown,
        statusText,
        error,
        openDemoModal,
        startNewProduct,
        closeDemoModal,
        setCurrentProduct,
        updateCurrentProduct,
        generateCatalogue,
        calculateFairPrice,
        setShowPriceBreakdown,
        addProductToList,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
