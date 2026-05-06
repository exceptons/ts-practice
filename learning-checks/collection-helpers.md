# Collection Helpers 理解度チェック

`src/exercises/collection-helpers.ts` を読んでから答えてください。

## 問題

1. `ProductCategory` で許可されている値をすべて挙げてください。

2. 商品データに `category: 'video'` を入れるとどうなりますか。TypeScript が受け入れるか、拒否するかと、その理由を説明してください。

3. 次の型は何を表していますか。

   ```ts
   export type CategoryCounts = Record<ProductCategory, number>
   ```

4. `CategoryCounts` オブジェクトには、どのキーが必ず存在する必要がありますか。

5. 次の型は何を表していますか。

   ```ts
   export type ProductUpdate = Partial<
     Pick<Product, 'name' | 'price' | 'stock' | 'isPublished'>
   >
   ```

6. `ProductUpdate` では `{ stock: 5 }` は許可されるのに、`{ sku: 'NEW' }` が許可されないのはなぜですか。

7. `getPublishedProducts` の戻り値型は何ですか。

8. 次の関数内で `filter` は何をしていますか。

   ```ts
   export const getPublishedProducts = (products: Product[]): Product[] =>
     products.filter((product) => product.isPublished)
   ```

9. `getProductNames` の戻り値型は何ですか。また、入力の配列型と違う型になるのはなぜですか。

10. `findProductBySku` が `Product` だけではなく `Product | undefined` を返すのはなぜですか。

11. `getCategoryCounts` で次の初期値が必要な理由を説明してください。

   ```ts
   {
     book: 0,
     tool: 0,
     course: 0,
   }
   ```

12. 次の computed property は何をしていますか。

   ```ts
   [product.category]: counts[product.category] + 1
   ```

13. 次の呼び出しをしたとき、`applyProductUpdate` はどのような `Product` を返しますか。

   ```ts
   applyProductUpdate(product, {
     stock: product.stock + 5,
     isPublished: true,
   })
   ```

14. `applyProductUpdate` で spread の順番を次のようにしている理由を説明してください。

   ```ts
   {
     ...product,
     ...update,
   }
   ```

15. もし spread の順番を次のように逆にした場合、何が変わりますか。

   ```ts
   {
     ...update,
     ...product,
   }
   ```
