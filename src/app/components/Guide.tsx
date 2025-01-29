"use client"

import { useState, useEffect } from "react";
import Image from "next/image";

interface GuideProps<T> {
    title: string;
    dataEndpoint: string;
    getItemKey: (item: T) => string | number;
    getItemLabel: (item: T) => string;
    getItemImage: (item: T) => string;
    onItemSelect: (item: T) => void;
    customImage?: string;
}

export const Guide = <T,>({
  title,
  dataEndpoint,
  getItemKey,
  getItemLabel,
  getItemImage,
  onItemSelect,
  customImage,
}: GuideProps<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    const [isGridVisible, setIsGridVisible] = useState(false);
}