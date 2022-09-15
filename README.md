<h1 align="center">Merge Data v3 → v4</h1>

Strapi versiyon 3 verilerinizi strapinin vermiş olduğu apiler ile versiyon 4 e taşıyın. Eklentiyi kullanabilmek için her iki taraftada swagger kullanılıyor olması gerekir.

## Swagger kurulumu V4

`npm` ile:
```bash
npm install @strapi/plugin-documentation
```

`yarn` ile:
```bash
yarn add @strapi/plugin-documentation
```

sonrasında strapi build edilmeli:
```bash
strapi build
```
<p align="center">
  <img src="https://raw.githubusercontent.com/OgzaTech/strapi-plugin-migratedata/main/assets/swagger_installed.png" alt="Meilisearch-Strapi"  height="200" />
</p>

[Strapi V3 e swagger kurulumu için](https://docs-v3.strapi.io/developer-docs/latest/development/plugins/documentation.html)

## Kurulum

Bu eklenti V4 için geliştirilmiştir.

Strapi projeniz içinde paketi ekleyin:

`npm` ile:
```bash
npm install strapi-plugin-merge-data
```

`yarn` ile:
```bash
yarn add strapi-plugin-merge-data
```

strapi config dosyası kullanın ve kod satırını ekleyin

```js
// config/plugins.js

module.exports = () => ({
  //...
  module.exports = {
    'strapi-plugin-migrate-data': {
        enabled: true,
        resolve: './node_modules/strapi-plugin-migrate-data/'
      },
}
})
```

sonrasında strapi build edilmeli:
```bash
strapi build
```

sonrasında strapiyi çalıştırın
```bash
strapi start
// veya
yarn start
```

Strapiyi production modda çalıştırın. Developer mod desteklenmez.


<p align="center">
  <img src="https://raw.githubusercontent.com/OgzaTech/strapi-plugin-migratedata/main/assets/installed_migrate_data.png" alt="Meilisearch-Strapi"  height="250" />
</p>

## Başlarken

V3 de V4 e geçiriceğiniz tabloya ait strapinin vermiş olduğu find ve count apisinin public rolunde açık olması gerekmektedir. 

## Tabloların seçilmesi ve eklenmesi

Settings sekmesini açıp V3 e ait swagger url i buraya giriyoruz ve ardından get entity model butonuna basıyoruz

<p align="center">
  <img src="https://raw.githubusercontent.com/OgzaTech/strapi-plugin-migratedata/main/assets/settings.png" alt="Meilisearch-Strapi"  height="230" />
</p>

sol tarafta v4 e ait talolar sağ tarafta ise v3 e ait tabloları seçebiliceğiniz bir tablo karşımıza çıkıyor

<p align="center">
  <img src="https://raw.githubusercontent.com/OgzaTech/strapi-plugin-migratedata/main/assets/settings_table.png" alt="Meilisearch-Strapi"  height="180" />
</p>

v4 deki tabloya karşılık gelen v3 tablosunu seçtikten sonra ok tuşuna basıp kolonları seçmeniz gerekir. Sol taraftakiler V4 e ait seçilmiş tablonun kolonları sol taraftakiler ise V3 e ait seçilmiş tablonun kolonlarıdır. V4 de seçilmiş tablonun kolonlarına karşılık gelicek v3 kolonlarını seçip devam ediyoruz. Bütün seçimleri yaptıktan sonra en aşağıda bulunan add choices butonuna basıyoruz.

<p align="center">
  <img src="https://raw.githubusercontent.com/OgzaTech/strapi-plugin-migratedata/main/assets/settings_select_column.png" alt="Meilisearch-Strapi"  height="300" />
</p>

Eklediklerimiz collection sekmesine fotoğraftaki gibi gelicektir. clear table seçeneğini işaretlerseniz veri aktarımından önce ilgili tablodaki tüm verileri siler ve ardından veri aktarımına başlar. tablolar arasında ilişki söz konusu ise kolonları doğru eşlediğimize emin olduktan sonra dikkat etmemiz gereken id kolonlarınıda seçmiş olmak. ilişkiler id ler üzerinden yapılacağından verilerin aynı id ile geçirilmiş olması gerekir. Bu sebeple relation trasfer butonunu kullanmadan önce ilişkili olan tabloların verilerini geçirmiş olmanız gereklidir aksi taktirde ilişkiler aktarılmicaktır. dikkat edilmesi gereken diğer konu ise veriyi geçirmeden önce aynı id ile veri varsa yeni veri eklenmicektir bunun için temiz tablolara veri aktarımı tavsiye edilmektedir aksi taktirde ilişkiler yanlış kurulabilir.

<p align="center">
  <img src="https://raw.githubusercontent.com/OgzaTech/strapi-plugin-migratedata/main/assets/collection.png" alt="Meilisearch-Strapi"  height="210" />
</p>