# Makefile originally from the 'Mastering Node' book written TJ Holowaychuk
# https://github.com/visionmedia/masteringnode
#

PDF_FLAGS = --fontsize 9.0 \
		--linkstyle plain \
		--linkcolor blue \
		--embedfonts \
		--footer "c 1" \
		--no-toc

MD = pages/title.md \
    chapters/toc.md \
    chapters/introduction.md \
    chapters/hello_world.md \
    chapters/platform_features.md \
    chapters/jitsu.md \
    chapters/web_admin.md \
    chapters/json_api.md \
    chapters/haibu.md \
    chapters/open_source_projects.md \
    chapters/faq.md \
    chapters/support.md \
    appendices/toc.md \
    appendices/package.json.md \
    appendices/resources.md \
    appendices/building_the_handbook.md

README =  pages/title.md \
    chapters/toc.readme.md \
    chapters/introduction.md \
    chapters/hello_world.md \
    chapters/platform_features.md \
    chapters/jitsu.md \
    chapters/web_admin.md \
    chapters/json_api.md \
    chapters/haibu.md \
    chapters/open_source_projects.md \
    chapters/faq.md \
    chapters/support.md

API = chapters/json_api.md 

HTML = $(MD:.md=.html)

all: book.html book.pdf book.md ReadMe.md API.md website clear

regenerate: clean all
	git commit -a -m '[dist] Regenerated handbook' && echo done

book.pdf: $(HTML)
	@echo "\n... generating $@"
	htmldoc --webpage -f $@ $(PDF_FLAGS) $(HTML)

book.md: $(HTML)
	@echo "\n... generating $@"
	cat $(MD) > book.md

ReadMe.md: $(HTML)
	@echo "\n... generating $@"
	cat $(README) > ReadMe.md

API.md: $(HTML)
	@echo "\n... generating $@"
	cat $(API) > API.md

book.html: pages/head.html pages/tail.html $(HTML)
	@echo "\n... generating $@"
	@echo $(HTML)
	cat pages/head.html $(HTML) pages/tail.html > book.html

public:
	mkdir public

website: book.html public
	@echo "\n... copying items into ./public"
	cp book.html public/index.html
	cp book.pdf public/book.pdf
	cp -r fig public/fig

serve: website
	@echo "\n... serving website!"
	node ./bin/server

%.html: %.md
	ronn --pipe --fragment $< \
		| sed -r 's/<h1>([^ ]+) - /<h1>/' \
		> $@

book.mobi:
	@echo "\n... generating $@"
	ebook-convert book.html book.mobi --output-profile kindle

book.epub:
	@echo "\n... generating $@"
	ebook-convert book.html book.epub \
		--title "Nodejitsu Handbook" \
		--no-default-epub-cover \
		--authors "Marak Squires, Joshua Holbrook" \
		--language en \
		--cover pages/cover.jpg

view: book.pdf
	open book.pdf

clean:
	rm -f book.*
	rm -f chapters/*.html
	rm -f appendices/*.html
	rm -f pages/index.html
	rm -f pages/title.html
	rm -rf public

clear:
	rm -f chapters/*.html
	rm -f appendices/*.html
	rm -f pages/index.html
	rm -f pages/title.html

.PHONY: view clean regenerate
