# LicitaSP

Esse projeto almeja integrar as bases de dados dos seguintes portais de compras públicas, fornecendo uma interface única:

* [BEC (Bolsa Eletrônica de Compras)](http://www.bec.sp.gov.br/BECSP/Home/Home.aspx)
* [Comprasnet](http://www.comprasgovernamentais.gov.br/index.php/placar-licitacoes)
* [e-negocios CidadeSP](http://e-negocioscidadesp.prefeitura.sp.gov.br)
* [Licitações-e](http://www.licitacoes-e.com.br/aop/index.jsp)
* [Pregão SP](http://www.pregao.sp.gov.br)

Até o momento, temos funcionando um *script* que armazena no banco de dados as atualizações diárias do site Comprasnet.

Para executá-lo, execute o seguinte comando dentro da pasta:

```
scrapy crawl comprasnet
```

Para executar o *script* recorrentemente, utilize um [agendador de *jobs*](https://en.wikipedia.org/wiki/Cron#Modern_versions).

## Estrutura de diretórios

A estrutura de diretórios deve soar familiar para alguém que já usou [Scrapy](https://doc.scrapy.org/en/latest/intro/tutorial.html):

* `scrapy.cfg`: Configurações do Scrapy.
* `licitasp/`: Raiz do projeto.
	* `api.py`: Fornece uma API JSON, que serve `GET /api/acquisitions`.
	* `items.py`: Define a classe `Acquisition`.
	* `pipelines.py`: Persistência dos objetos em MongoDB.
	* `settings.py`: Configurações do projeto.
	* `spiders/`: Define os *crawlers*.
		* `comprasnet_spider.py`: *Crawler* do site Comprasnet.
		* `comprasnet_spider.py.md`: Documentação extensiva do arquivo anterior em formato *literate programming*.

## Requisitos

O projeto requer Python com os plugins `scrapy`, `flask` e `pymongo`, bem como MongoDB.