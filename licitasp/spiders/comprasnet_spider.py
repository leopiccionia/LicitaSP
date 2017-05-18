# -*- coding: utf-8 -*-

import re
import scrapy

# Parser of <comprasnet.gov.br> daily updates.
class ComprasNet(scrapy.Spider):

    name = 'comprasnet'

    def start_requests(self):
        yield scrapy.Request(url='http://www.comprasnet.gov.br/ConsultaLicitacoes/ConsLicitacaoDia.asp?pagina=1')

    def parse(self, response):
        forms = response.css('form')
        for form in forms:
            date = None
            description = re.search('Objeto: (.*?)<br>', form.extract()).group(1).strip()
            modality = None
            organization = None
            source = self.name
            link = 'http://www.comprasnet/gov.br/ConsultaLicitacoes/download/download_editais_detalhe.asp' + form.css('[name="itens"]').re('\'(\?[^\']*)\'')[0]
            #yield Acquisition()
            #print link
        has_next = response.css('[name="proxima"]')
        if has_next:
            current_page = re.search('(\\d+)$', response.url).group(0)
            next_url = response.url.replace(current_page, str(int(current_page) + 1))
            print next_url
            yield scrapy.Request(url=next_url, callback=self.parse)
