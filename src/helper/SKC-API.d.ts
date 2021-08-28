declare type ProductInfo = {
	productId: string,
	productLocale?: string,
	productName?: string,
	productType?: string,
	productSubType?: string,
	productReleaseDate: string,
	productTotal?: number,
	// productRarityStats? {
	productContent: ProductContent[]
}

declare type ProductContent = {
	productPosition: string,
	rarities: string[]
	card?: Card
}

declare type Card = {

}
