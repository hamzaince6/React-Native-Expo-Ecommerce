export interface BannerItem {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
}

export const bannerData: BannerItem[] = [
  {
    id: '1',
    imageUrl: 'https://images.hepsiburada.net/banners/s/1/704-220/yaz_always_on_jenerik_slider_(1)133928160843461085.png/format:webp',
    title: 'Summer Collection',
    subtitle: 'Exclusive deals on summer essentials'
  },
  {
    id: '2',
    imageUrl: 'https://images.hepsiburada.net/banners/s/1/704-220/hepsipay_kartim_slider_0706133928161610095.png/format:webp',
    title: 'Special Offers',
    subtitle: 'Limited time discounts'
  },
  {
    id: '3',
    imageUrl: 'https://images.hepsiburada.net/banners/s/1/704-220/cep_telefonlari_slider_0706133928161610095.png/format:webp',
    title: 'New Arrivals',
    subtitle: 'Check out our latest products'
  },
  {
    id: '4',
    imageUrl: 'https://images.hepsiburada.net/banners/s/1/704-220/supermarket_slider_0706133928161610095.png/format:webp',
    title: 'Exclusive Deals',
    subtitle: 'Shop now and save big'
  }
]; 