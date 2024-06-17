"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { formatCurrency } from "@/lib/formatter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { addProduct } from "../../_actions/products";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFormStatus, useFormState } from "react-dom";

export function ProductForm() {
  const [error, action] = useFormState(addProduct, {});
  const [originalPriceInMnt, setOriginalPriceInMnt] = useState<number>(0);
  const [salePercent, setSalePercent] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isSaleAvailable, setIsSaleAvailable] = useState<boolean>(false);

  const handleAvailabilityChange = (event: { target: { value: string } }) => {
    const value = event.target.value === "true";
    setIsAvailable(value);
    setIsSaleAvailable(value);
  };

  const handlePriceChange = (e: { target: { value: any } }) => {
    const value = Number(e.target.value);
    setOriginalPriceInMnt(isNaN(value) ? 0 : value);
    setError({ ...error, originalPriceInMnt: undefined });
  };

  const calculateSalePrice = (originalPrice: number, percent: number) => {
    const discountAmount = (originalPrice * percent) / 100;
    return originalPrice - discountAmount;
  };

  const salePrice = calculateSalePrice(originalPriceInMnt, salePercent);

  const renderSizes = () => {
    switch (selectedCategory) {
      case "shoes":
        return (
          <SelectGroup>
            {/* Shoes sizes */}
            {Array.from({ length: 36 }, (_, i) => i + 15).map(size => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
            <SelectItem value="50+">50+</SelectItem>
          </SelectGroup>
        );
      default:
        return (
          <SelectGroup>
            <SelectLabel>{selectedCategory}</SelectLabel>
            <SelectItem value="xs">Extra small (XS)</SelectItem>
            <SelectItem value="s">Small (S)</SelectItem>
            <SelectItem value="m">Medium (M)</SelectItem>
            <SelectItem value="l">Large (L)</SelectItem>
            <SelectItem value="xl">Extra large (XL)</SelectItem>
            <SelectItem value="xxl">XXL (2XL)</SelectItem>
            <SelectItem value="xxxl">XXXL (3XL)</SelectItem>
          </SelectGroup>
        );
    }
  };

  const renderItems = () => {
    switch (selectedCategory) {
      case "c_shoes":
        return (
          <SelectGroup>
            <SelectLabel>Shoes</SelectLabel>
            <SelectItem value="sc_boots">Boots</SelectItem>
            <SelectItem value="sc_sneakers-training">Sneakers & Training</SelectItem>
            <SelectItem value="sc_highHeels">High heels</SelectItem>
            <SelectItem value="sc_oxford">Oxford</SelectItem>
            <SelectItem value="sc_loafers-slipOn">Loafers & Slip-on</SelectItem>
            <SelectItem value="sc_sandals-slippers">Sandals & Slippers</SelectItem>
            <SelectItem value="sc_workBoots">Work boots</SelectItem>
            <SelectItem value="sc_climbingShoes">Climbing shoes</SelectItem>
          </SelectGroup>
        );
      case "c_t-shirts":
        return (
          <SelectGroup>
            <SelectLabel>T-shirts</SelectLabel>
            <SelectItem value="sc_crewNeck">Crew neck</SelectItem>
            <SelectItem value="sc_vNeck">V-neck</SelectItem>
            <SelectItem value="sc_polo">Polo</SelectItem>
            <SelectItem value="sc_henley">Henley</SelectItem>
            <SelectItem value="sc_scoopNeck">Scoop neck</SelectItem>
            <SelectItem value="sc_raglan">Raglan sleeve</SelectItem>
            <SelectItem value="sc_cap">Cap sleeve</SelectItem>
            <SelectItem value="sc_tankTops">Tank tops</SelectItem>
            <SelectItem value="sc_pocket">Pocket tees</SelectItem>
            <SelectItem value="sc_graphic">Graphic tees</SelectItem>
            <SelectItem value="sc_mini">Mini t-shirts</SelectItem>
          </SelectGroup>
        );
      case "c_pants-leggings":
        return (
          <SelectGroup>
            <SelectLabel>Pants & Leggings</SelectLabel>
            <SelectItem value="sc_jeans">Jeans</SelectItem>
            <SelectItem value="sc_chinos">Chinos</SelectItem>
            <SelectItem value="sc_sweatpants">Sweatpants</SelectItem>
            <SelectItem value="sc_wide">Wide pants</SelectItem>
            <SelectItem value="sc_cargo">Cargo pants</SelectItem>
            <SelectItem value="sc_dressPants">Dress Pants</SelectItem>
            <SelectItem value="sc_ankle">Ankle pants</SelectItem>
            <SelectItem value="sc_straight">Straight pants</SelectItem>
            <SelectItem value="sc_tapered">Tapered pants</SelectItem>
            <SelectItem value="sc_jogger">Jogger</SelectItem>
            <SelectItem value="sc_ribbed">Ribbed pants</SelectItem>
            <SelectItem value="sc_waffle">Waffle pants</SelectItem>
            <SelectItem value="sc_leggings">Leggings</SelectItem>
            <SelectItem value="sc_track-pants">Track pants</SelectItem>
          </SelectGroup>
        );
      case "c_outerwears":
        return (
          <SelectGroup>
            <SelectLabel>Outerwears</SelectLabel>
            <SelectItem value="sc_vest">Vest</SelectItem>
            <SelectItem value="sc_coat">Coat</SelectItem>
            <SelectItem value="sc_shortCoat">Short coat</SelectItem>
            <SelectItem value="sc_padded">Padded jacket</SelectItem>
            <SelectItem value="sc_fleece">Fleece jacket</SelectItem>
            <SelectItem value="sc_parka">Parka</SelectItem>
            <SelectItem value="sc_light">Light jacket</SelectItem>
            <SelectItem value="sc_full-zipped">Full-zipped jacket</SelectItem>
            <SelectItem value="sc_long">Long coat</SelectItem>
            <SelectItem value="sc_bomber">Bomber jacket</SelectItem>
            <SelectItem value="sc_blazer">Blazer jacket</SelectItem>
            <SelectItem value="sc_denim">Denim jacket</SelectItem>
            <SelectItem value="sc_leather">Leahter jacket</SelectItem>
            <SelectItem value="sc_anarok">Anarok jacket</SelectItem>
            <SelectItem value="sc_field">Field jacket</SelectItem>
          </SelectGroup>
        );
      case "c_tops":
        return (
          <SelectGroup>
            <SelectLabel>Tops</SelectLabel>
            <SelectItem value="sc_hoodies">Hoodies</SelectItem>
            <SelectItem value="sc_sweater">Sweater</SelectItem>
            <SelectItem value="sc_cardigan">Cardigan</SelectItem>
            <SelectItem value="sc_blouse">Blouse</SelectItem>
            <SelectItem value="sc_knitwear">Knitwear</SelectItem>
            <SelectItem value="sc_long">Long sleeve</SelectItem>
            <SelectItem value="sc_shirt">Shirts</SelectItem>
            <SelectItem value="sc_sweatshirt">Sweatshirts</SelectItem>
          </SelectGroup>
        );
      case "c_nightwear":
        return (
          <SelectGroup>
            <SelectLabel>Nightwear</SelectLabel>
            <SelectItem value="sc_pyjamas">Pyjamas</SelectItem>
            <SelectItem value="sc_flannel">Flannel pants</SelectItem>
            <SelectItem value="sc_fleeceSet">Fleece set</SelectItem>
          </SelectGroup>
        );
      case "c_shorts":
        return (
          <SelectGroup>
            <SelectLabel>Shorts</SelectLabel>
            <SelectItem value="sc_biker">Biker shorts</SelectItem>
            <SelectItem value="sc_fit">Fit shorts</SelectItem>
            <SelectItem value="sc_denim">Denim shorts</SelectItem>
            <SelectItem value="sc_athletic">Athletic shorts</SelectItem>
            <SelectItem value="sc_board">Board shorts</SelectItem>
            <SelectItem value="sc_bermuda">Bermuda shorts</SelectItem>
            <SelectItem value="sc_chino">Chino shorts</SelectItem>
            <SelectItem value="sc_tailored">Tailored shorts</SelectItem>
            <SelectItem value="sc_casual">Casual shorts</SelectItem>
            <SelectItem value="sc_high-waisted">High-waisted shorts</SelectItem>
            <SelectItem value="sc_running">Running shorts</SelectItem>
            <SelectItem value="sc_geared">Geared shorts</SelectItem>
          </SelectGroup>
        );
      case "c_socks-hosiery":
        return (
          <SelectGroup>
            <SelectLabel>Socks & Hosiery</SelectLabel>
            <SelectItem value="sc_long">Long socks</SelectItem>
            <SelectItem value="sc_screw">Crew socks</SelectItem>
            <SelectItem value="sc_half">Half socks</SelectItem>
            <SelectItem value="sc_short">Short socks</SelectItem>
            <SelectItem value="sc_low-cut">Low cut socks</SelectItem>
            <SelectItem value="sc_knee-high">Knee high socks</SelectItem>
            <SelectItem value="sc_thigh-high">Tigh high socks</SelectItem>
            <SelectItem value="sc_dress-socks">Dress socks</SelectItem>
            <SelectItem value="sc_athletic-socks">Athletic socks</SelectItem>
            <SelectItem value="sc_compression">Compression socks</SelectItem>
            <SelectItem value="sc_thights">Thights</SelectItem>
            <SelectItem value="sc_stockings">Stockings</SelectItem>
          </SelectGroup>
        );
      case "c_swimwear":
        return (
          <SelectGroup>
            <SelectLabel>Swimwear</SelectLabel>
            <SelectItem value="sc_board-shorts">Board shorts</SelectItem>
            <SelectItem value="sc_bikini">Bikini</SelectItem>
            <SelectItem value="sc_goggles">Swim goggles</SelectItem>
            <SelectItem value="sc_rash-guards">Rash guards</SelectItem>
            <SelectItem value="sc_one-peace">One-peace swimsuits</SelectItem>
            <SelectItem value="sc_tankinis">Tankinis</SelectItem>
            <SelectItem value="sc_trunks">Swim trunks</SelectItem>
            <SelectItem value="sc_cover-ups">Cover-ups</SelectItem>
            <SelectItem value="sc_swim-caps">Swim caps</SelectItem>
            <SelectItem value="sc_swim-shoes">Swim shoes</SelectItem>
            <SelectItem value="sc_swim-accessories">Swim accessories</SelectItem>
          </SelectGroup>
        );
      case "c_underwear":
        return (
          <SelectGroup>
            <SelectLabel>Underwear</SelectLabel>
            <SelectItem value="sc_briefs">Briefs</SelectItem>
            <SelectItem value="sc_highhugger">Highhugger</SelectItem>
            <SelectItem value="sc_boyshorts">Boyshorts</SelectItem>
            <SelectItem value="sc_bikinis">Bikinis</SelectItem>
            <SelectItem value="sc_boxer-briefs">Boxer briefs</SelectItem>
            <SelectItem value="sc_boxer-shorts">Boxer shorts</SelectItem>
            <SelectItem value="sc_long-johns">Long Johns</SelectItem>
            <SelectItem value="sc_trunks">Trunks</SelectItem>
          </SelectGroup>
        );
      case "c_suits-blazzer":
        return (
          <SelectGroup>
            <SelectLabel>Suits & Blazers</SelectLabel>
            <SelectItem value="sc_two-pieces">Two-piece suits</SelectItem>
            <SelectItem value="sc_three-piece">Three-piece suits</SelectItem>
            <SelectItem value="sc_tuxedos">Tuxedos</SelectItem>
            <SelectItem value="sc_morning">Morning suits</SelectItem>
            <SelectItem value="sc_single-breasted">Single breasted</SelectItem>
            <SelectItem value="sc_double-breasted">Double breasted</SelectItem>
            <SelectItem value="sc_sports-coats">Sport coats</SelectItem>
            <SelectItem value="sc_casual-blazers">Casual blazers</SelectItem>
            <SelectItem value="sc_structured">Structured blazers</SelectItem>
            <SelectItem value="sc_unstructured">Unstructured blazers</SelectItem>
            <SelectItem value="sc_patch-pocket">Patch pocket blazers</SelectItem>
            <SelectItem value="sc_navy">Navy blazers</SelectItem>
            <SelectItem value="sc_velvet">Velvet blazers</SelectItem>
          </SelectGroup>
        );
      case "c_dresses":
        return (
          <SelectGroup>
            <SelectLabel>Dresses</SelectLabel>
            <SelectItem value="sc_casual-drresses">Casual dresses</SelectItem>
            <SelectItem value="sc_work-office-dresses">Work/Office dresses</SelectItem>
            <SelectItem value="sc_evening-party">Evening/Party dresses</SelectItem>
            <SelectItem value="sc_formal">Formal dresses</SelectItem>
            <SelectItem value="sc_wedding">Wedding dresses</SelectItem>
            <SelectItem value="sc_athletic-active-dresses">Athletic/Active dresses</SelectItem>
          </SelectGroup>
        );
      case "c_skirts":
        return (
          <SelectGroup>
            <SelectLabel>Skirts</SelectLabel>
            <SelectItem value="sc_jeans">Jeans</SelectItem>
            <SelectItem value="sc_chinos">Chinos</SelectItem>
            <SelectItem value="sc_sweatpants">Sweatpants</SelectItem>
            <SelectItem value="sc_shorts">Shorts</SelectItem>
            <SelectItem value="sc_cargo">Cargo</SelectItem>
            <SelectItem value="sc_dressPants">Dress Pants</SelectItem>
          </SelectGroup>
        );
      case "c_sportswear-activities":
        return (
          <SelectGroup>
            <SelectLabel>Sportswera/Activity wears</SelectLabel>
            <SelectItem value="sc_outerwears-sports">Outerwears</SelectItem>
            <SelectItem value="sc_tops-sports">Tops</SelectItem>
            <SelectItem value="sc_bottoms-sports">Bottoms</SelectItem>
            <SelectItem value="sc_underwears-sports">Underwears</SelectItem>
          </SelectGroup>
        );
      case "c_mathernity":
        return (
          <SelectGroup>
            <SelectLabel>Mathernity clothes</SelectLabel>
            <SelectItem value="sc_outerwears-mathernity">Outerwears</SelectItem>
            <SelectItem value="sc_tops-mathernity">Tops</SelectItem>
            <SelectItem value="sc_bottoms-mathernity">Bottoms</SelectItem>
            <SelectItem value="sc_underwears-mathernity">Underwears</SelectItem>
          </SelectGroup>
        );
      case "c_accessories":
        return (
          <SelectGroup>
            <SelectLabel>Accessories</SelectLabel>
            <SelectItem value="sc_hats">Hats</SelectItem>
            <SelectItem value="sc_bags">Bags</SelectItem>
            <SelectItem value="sc_belts">Belts</SelectItem>
            <SelectItem value="sc_rings">Rings</SelectItem>
            <SelectItem value="sc_earrings">Earrings</SelectItem>
            <SelectItem value="sc_chaings">Chains</SelectItem>
            <SelectItem value="sc_jewelleries">Jewelleries</SelectItem>
          </SelectGroup>
        );
      default:
        return null;
    }
  };

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="parentCatecory">Main Category</Label>
        <Select name="parentCatecory" required>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a main category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pc_male">Male</SelectItem>
            <SelectItem value="pc_female">Female</SelectItem>
            <SelectItem value="pc_unisex">Unisex</SelectItem>
            <SelectItem value="pc_child">Child</SelectItem>
            <SelectItem value="pc_baby">Baby</SelectItem>
            <SelectItem value="pc_maternity">Maternity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select name="category" required onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="c_shoes">Shoes</SelectItem>
              <SelectItem value="c_t-shirts">T-shirts</SelectItem>
              <SelectItem value="c_pants-leggings">Pants & Leggings</SelectItem>
              <SelectItem value="c_outerwears">Outerwears</SelectItem>
              <SelectItem value="c_tops">Tops</SelectItem>
              <SelectItem value="c_pants">Nightwear</SelectItem>
              <SelectItem value="c_nightwear">Pants</SelectItem>
              <SelectItem value="c_shorts">Shorts</SelectItem>
              <SelectItem value="c_socks-hosiery">Socks & Hosiery</SelectItem>
              <SelectItem value="c_swimwear">Swimwear</SelectItem>
              <SelectItem value="c_sportswear-activities">Sportswear & Activity wears</SelectItem>
              <SelectItem value="c_suit-blazzer">Suits & Blazzers</SelectItem>
              <SelectItem value="c_underwear">Underwear</SelectItem>
              <SelectItem value="c_dresses">Dresses</SelectItem>
              <SelectItem value="c_mathernity">Mathernity clothes</SelectItem>
              <SelectItem value="c_skirts">Skirts</SelectItem>
              <SelectItem value="c_accessories">Accessories</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {selectedCategory && (
        <div className="space-y-2">
          <Label htmlFor="subCategory">Sub-category</Label>
          <Select name="subCategory" required onValueChange={setSelectedItem}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder={`Select a ${selectedCategory}`} />
            </SelectTrigger>
            <SelectContent>{renderItems()}</SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>

      <div className="space-y-2">
        <label htmlFor="isSaleAvailable">Sale availability?</label>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="isSaleAvailable_true"
            name="isSaleAvailable"
            value="true"
            checked={isSaleAvailable}
            onChange={handleAvailabilityChange}
          />
          <label htmlFor="isSaleAvailable_true">Available</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="isSaleAvailable_false"
            name="isSaleAvailable"
            value="false"
            checked={!isSaleAvailable}
            onChange={handleAvailabilityChange}
          />
          <label htmlFor="isSaleAvailable_false">Not available</label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="salePercent">Percent of sale</Label>
        <Input
          type="number"
          id="salePercent"
          name="salePercent"
          required
          value={salePercent}
          onChange={e => setSalePercent(Number(e.target.value) || undefined)}
        />
        <div className="text-muted-foreground">{salePercent}%</div>
        {error.priceInMnt && <div className="text-destructive">{error.priceInMnt}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="originalPriceInMnt">Price</Label>
        <Input
          type="number"
          id="originalPriceInMnt"
          name="originalPriceInMnt"
          required
          value={originalPriceInMnt}
          onChange={handlePriceChange}
        />
        <div className="text-muted-foreground">{formatCurrency(originalPriceInMnt || 0)}</div>
        {error.originalPriceInMnt && (
          <div className="text-destructive">{error.originalPriceInMnt}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="discountentPriceInMnt">Sale price</Label>
        <div className="text-muted-foreground">{formatCurrency(salePrice || 0)}</div>
        {error.discountentPriceInMnt && (
          <div className="text-destructive">{error.discountentPriceInMnt}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="numberOfItems">Number of items</Label>
        <Input type="number" id="numberOfItems" name="numberOfItems" required />
        {error.numberOfItems && <div className="text-destructive">{error.numberOfItems}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="fit">Fit</Label>
        <Select name="fit" required>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a fit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="slim">Slim</SelectItem>
            <SelectItem value="regular">Regular</SelectItem>
            <SelectItem value="straight">Straight</SelectItem>
            <SelectItem value="oversized">Oversized</SelectItem>
            <SelectItem value="plus">Plus fit</SelectItem>
            <SelectItem value="maternity-fit">Maternity fit</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="brand">Brand</Label>
        <Input type="text" id="brand" name="brand" required />
        {error.brand && <div className="text-destructive">{error.brand}</div>}
      </div>
      {selectedCategory && (
        <div className="space-y-2">
          <Label htmlFor="size">Select a size</Label>
          <Select name="size" required onValueChange={setSelectedSize}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder={`Select a ${selectedCategory}`} />
            </SelectTrigger>
            <SelectContent>{renderSizes()}</SelectContent>
          </Select>
          {error.size && <div className="text-destructive">{error.size}</div>}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="season">Season</Label>
        <Select name="season" required>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a season" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="winter">Winter</SelectItem>
            <SelectItem value="fall">Fall</SelectItem>
            <SelectItem value="summer">Summer</SelectItem>
            <SelectItem value="spring">Spring</SelectItem>
            <SelectItem value="all-season">All season</SelectItem>
            <SelectItem value="fall-winter">Fall/Winter</SelectItem>
            <SelectItem value="spring-summer">Spring/Summer</SelectItem>
            <SelectItem value="fall-spring">Fall/Spring</SelectItem>
          </SelectContent>
        </Select>
        {error.season && <div className="text-destructive">{error.season}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="generalColor">General color</Label>
        <Select name="generalColor" required>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="black">Black</SelectItem>
            <SelectItem value="white">White</SelectItem>
            <SelectItem value="gray">Gray</SelectItem>
            <SelectItem value="dark-gray">Dark gray</SelectItem>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="navy-blue">Navy blue</SelectItem>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="yellow">Yellow</SelectItem>
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="pink">Pink</SelectItem>
            <SelectItem value="brown">Brown</SelectItem>
            <SelectItem value="beige">Beige</SelectItem>
            <SelectItem value="purple">Purple</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
            <SelectItem value="burgundy-maroon">Burgundy/maroon</SelectItem>
            <SelectItem value="teal-turquose">Teal/Turquose</SelectItem>
            <SelectItem value="olive">Olive</SelectItem>
            <SelectItem value="coral">Coral</SelectItem>
            <SelectItem value="mint">Mint</SelectItem>
            <SelectItem value="ivory-cream">Ivory/Cream</SelectItem>
            <SelectItem value="charcoal">Charcoal</SelectItem>
          </SelectContent>
        </Select>
        {error.generalColor && <div className="text-destructive">{error.generalColor}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="pattern">Pattern</Label>
        <Select name="pattern" required>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a patter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="solid">Solid</SelectItem>
            <SelectItem value="stripes">Stripes</SelectItem>
            <SelectItem value="plaid-checks">Plaid/Checks</SelectItem>
            <SelectItem value="polka-dots">Polka Dots</SelectItem>
            <SelectItem value="floral">Floral</SelectItem>
            <SelectItem value="prints">Prints</SelectItem>
            <SelectItem value="color-block">Color block</SelectItem>
            <SelectItem value="paisley">Paisley</SelectItem>
            <SelectItem value="houndstooth">Houndstooth</SelectItem>
            <SelectItem value="chevron">Chevron</SelectItem>
            <SelectItem value="argyle">Argyle</SelectItem>
            <SelectItem value="camouflage">Camouflage</SelectItem>
            <SelectItem value="abstract">Abstract</SelectItem>
            <SelectItem value="tie-dye">Tie-Dye</SelectItem>
            <SelectItem value="plaid">Plaid</SelectItem>
            <SelectItem value="ethnic-tribal">Ethnic/Tribal</SelectItem>
            <SelectItem value="pinstripe">Pinstripe</SelectItem>
            <SelectItem value="ikat">Ikat</SelectItem>
            <SelectItem value="jacquard">Jacquard</SelectItem>
          </SelectContent>
        </Select>
        {error.pattern && <div className="text-destructive">{error.pattern}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="material">Material</Label>
        <Select name="material" required>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a material" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Organic</SelectLabel>
              <SelectItem value="cotton">Cotton</SelectItem>
              <SelectItem value="linen">Linen</SelectItem>
              <SelectItem value="wool">Wool</SelectItem>
              <SelectItem value="silk">Silk</SelectItem>
              <SelectItem value="hemp">Hemp</SelectItem>
              <SelectItem value="cashmere">Cashmere</SelectItem>
              <SelectItem value="leather">Leather</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Synthetic</SelectLabel>
              <SelectItem value="polyester">Polyester</SelectItem>
              <SelectItem value="nylon">Nylon</SelectItem>
              <SelectItem value="acrylic">Acrylic</SelectItem>
              <SelectItem value="spandex">Spandex (Lycra)</SelectItem>
              <SelectItem value="rayon">Rayon (Viscose)</SelectItem>
              <SelectItem value="acetate">Acetate</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Blended fabrics</SelectLabel>
              <SelectItem value="polyester-cotton">Polyester-Cotton (Polly-Cotton)</SelectItem>
              <SelectItem value="wool-blend">Wool-Blend</SelectItem>
              <SelectItem value="spandex-belnd">Spandex Blends</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Speciality fabrics</SelectLabel>
              <SelectItem value="denim">Denim</SelectItem>
              <SelectItem value="velvet">Velvet</SelectItem>
              <SelectItem value="corduroy">Corduroy</SelectItem>
              <SelectItem value="chiffon">Chiffon</SelectItem>
              <SelectItem value="tweed">Tweed</SelectItem>
              <SelectItem value="tulle">Tulle</SelectItem>
              <SelectItem value="suede">Suede</SelectItem>
              <SelectItem value="fleece">Fleece</SelectItem>
              <SelectItem value="lace">Lace</SelectItem>
              <SelectItem value="gabardine">Gabardine</SelectItem>
              <SelectItem value="satin">Satin</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {error.material && <div className="text-destructive">{error.material}</div>}
      </div>
      <div className="space-y-2">
        <label htmlFor="isAvailableForOrder">Order availability?</label>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="isAvailableForOrder_true"
            name="isAvailableForOrder"
            value="true"
            checked={isAvailable}
            onChange={handleAvailabilityChange}
          />
          <label htmlFor="isAvailableForOrder_true">Available</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="isAvailableForOrder_false"
            name="isAvailableForOrder"
            value="false"
            checked={!isAvailable}
            onChange={handleAvailabilityChange}
          />
          <label htmlFor="isAvailableForOrder_false">Not available</label>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required />
        {error.file && <div className="text-destructive">{error.file}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required />
        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea typeof="text" id="description" name="description" required />
        {error.description && <div className="text-destructive">{error.description}</div>}
      </div>
      <Button type="submit" disabled={useFormStatus().pending}>
        {useFormStatus().pending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
function setError(arg0: {
  originalPriceInMnt: undefined;
  category?: string[] | undefined;
  subCategory?: string[] | undefined;
  name?: string[] | undefined;
  numberOfItems?: string[] | undefined;
  fit?: string[] | undefined;
  sex?: string[] | undefined;
  brand?: string[] | undefined;
  size?: string[] | undefined;
  age?: string[] | undefined;
  season?: string[] | undefined;
  generalColor?: string[] | undefined;
  pattern?: string[] | undefined;
  material?: string[] | undefined;
  isAvailableForOrder?: string[] | undefined;
  file?: string[] | undefined;
  image?: string[] | undefined;
  description?: string[] | undefined;
}) {
  throw new Error("Function not implemented.");
}
