import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Cache for storing fetched logos to avoid redundant API calls
const logoCache: Record<string, string> = {};

/**
 * Fetches a cryptocurrency logo from CoinGecko API
 * @param coinId The CoinGecko ID of the coin (e.g., 'bitcoin', 'ethereum')
 * @returns A Promise that resolves to the logo URL or a fallback image if not found
 */
export async function getCoinLogo(coinId: string): Promise<string> {
  // Return from cache if available
  if (logoCache[coinId]) {
    return logoCache[coinId];
  }
  
  try {
    // CoinGecko API endpoint for coin data
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId.toLowerCase()}`);
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    const logoUrl = data.image?.large || data.image?.small || "https://placehold.co/100x100?text=Asset";
    
    // Cache the result
    logoCache[coinId] = logoUrl;
    
    return logoUrl;
  } catch (error) {
    console.error("Error fetching coin logo:", error);
    return "https://placehold.co/100x100?text=Asset";
  }
}

/**
 * Maps common token names to their CoinGecko IDs
 * @param tokenName The name of the token as displayed in the UI
 * @returns The corresponding CoinGecko ID or the original name if no mapping exists
 */
export function mapTokenNameToCoinGeckoId(tokenName: string): string {
  // Extract the token name from formats like "CL200-WETH/dogimme"
  const parts = tokenName.split('/');
  let mainToken = parts[0];
  
  // If it has a format like "CL200-WETH", extract just "WETH"
  if (mainToken.includes('-')) {
    mainToken = mainToken.split('-')[1];
  }
  
  // Common token name mappings
  const tokenMap: Record<string, string> = {
    'WETH': 'ethereum',
    'ETH': 'ethereum',
    'WBTC': 'wrapped-bitcoin',
    'BTC': 'bitcoin',
    'USDC': 'usd-coin',
    'USDT': 'tether',
    'SOL': 'solana',
    'AVAX': 'avalanche-2',
    'MATIC': 'matic-network',
    'LINK': 'chainlink',
    'UNI': 'uniswap',
    'AAVE': 'aave',
    'DAI': 'dai',
    'DOGE': 'dogecoin',
    'SHIB': 'shiba-inu',
    'DOT': 'polkadot',
    'ADA': 'cardano',
    'XRP': 'ripple',
  };
  
  return tokenMap[mainToken] || mainToken.toLowerCase();
}

/**
 * Maps blockchain/network names to their CoinGecko IDs
 * @param chainName The name of the blockchain/network
 * @returns The corresponding CoinGecko ID or a fallback
 */
export function mapChainNameToCoinGeckoId(chainName: string): string {
  // Common blockchain/network name mappings
  const chainMap: Record<string, string> = {
    'Ethereum': 'ethereum',
    'Bitcoin': 'bitcoin',
    'Solana': 'solana',
    'Arbitrum': 'arbitrum',
    'Arbitrum One': 'arbitrum',
    'Avalanche': 'avalanche-2',
    'Polygon': 'polygon-pos',
    'Optimism': 'optimism',
    'Base': 'base',
    'BNB Chain': 'binancecoin',
    'BNB': 'binancecoin',
    'Binance': 'binancecoin',
    'Cardano': 'cardano',
    'Polkadot': 'polkadot',
    'Cosmos': 'cosmos',
    'Algorand': 'algorand',
    'Tezos': 'tezos',
    'Near': 'near',
    'Fantom': 'fantom',
    'Harmony': 'harmony',
    'Celo': 'celo',
    'Gnosis': 'gnosis',
    'Moonbeam': 'moonbeam',
    'Moonriver': 'moonriver',
    'Cronos': 'crypto-com-chain',
    'Klaytn': 'klay-token',
    'Hedera': 'hedera-hashgraph',
    'Sui': 'sui',
    'Aptos': 'aptos',
  };
  
  return chainMap[chainName] || 'ethereum'; // Default to ethereum if not found
}

/**
 * Fetches a blockchain/network logo from CoinGecko API
 * @param chainName The name of the blockchain/network
 * @returns A Promise that resolves to the logo URL or a fallback image
 */
export async function getChainLogo(chainName: string): Promise<string> {
  const coinGeckoId = mapChainNameToCoinGeckoId(chainName);
  return getCoinLogo(coinGeckoId);
}
