"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
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

export function ProductForm() {
  const [priceInMnt, setPrice] = useState<number>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const renderItems = () => {
    switch (selectedCategory) {
      case "shoes":
        return (
          <SelectGroup>
            <SelectLabel>Shoes</SelectLabel>
            <SelectItem value="boots">Boots</SelectItem>
            <SelectItem value="sneakers-training">Sneakers & Training</SelectItem>
            <SelectItem value="highHeels">High heels</SelectItem>
            <SelectItem value="oxford">Oxford</SelectItem>
            <SelectItem value="loafers-slipOn">Loafers & Slip-on</SelectItem>
            <SelectItem value="sandals-slippers">Sandals & Slippers</SelectItem>
          </SelectGroup>
        );
      case "t-shirts":
        return (
          <SelectGroup>
            <SelectLabel>T-shirts</SelectLabel>
            <SelectItem value="crewNeck">Crew neck</SelectItem>
            <SelectItem value="polo">Polo</SelectItem>
            <SelectItem value="henley">Henley</SelectItem>
            <SelectItem value="scoopNeck">Scoop neck</SelectItem>
            <SelectItem value="raglan">Raglan sleeve</SelectItem>
            <SelectItem value="long">Long sleeve</SelectItem>
            <SelectItem value="cap">Cap sleeve</SelectItem>
          </SelectGroup>
        );
      case "pants":
        return (
          <SelectGroup>
            <SelectLabel>Pants</SelectLabel>
            <SelectItem value="jeans">Jeans</SelectItem>
            <SelectItem value="chinos">Chinos</SelectItem>
            <SelectItem value="sweatpants">Sweatpants</SelectItem>
            <SelectItem value="shorts">Shorts</SelectItem>
            <SelectItem value="cargo">Cargo</SelectItem>
            <SelectItem value="dressPants">Dress Pants</SelectItem>
          </SelectGroup>
        );
      default:
        return null;
    }
  };

  return (
    <form action="submit" className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="shoes">Shoes</SelectItem>
              <SelectItem value="t-shirts">T-shirts</SelectItem>
              <SelectItem value="pants">Pants</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {selectedCategory && (
        <div className="space-y-2">
          <Label htmlFor="item">Sub-category</Label>
          <Select onValueChange={setSelectedItem}>
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
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          name="price"
          required
          value={priceInMnt}
          onChange={e => setPrice(Number(e.target.value) || undefined)}
        />
        <div className="text-muted-foreground">{formatCurrency(priceInMnt || 0)}</div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fit">Fit</Label>
        <Input type="text" id="fit" name="fit" required />
      </div>
    </form>
  );
}
