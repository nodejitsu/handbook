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
	chapters/Table_Of_Contents.md \ #Hoping to autogenerate, yo
    chapters/introduction.md \
    chapters/hello_world.md \
	chapters/open_source_projects.md \
    chapters/platform_features.md \
    chapters/jitsu.md \
    chapters/web_admin.md \
    chapters/json_api.md \
    chapters/haibu.md \
    chapters/troubleshooting_and_support.md \
	chapters/appendix.md

README = pages/index.md \
	chapters/Table_Of_Contents.md \
    chapters/Introduction.md\
	chapters/Deploying_Applications.md \
	chapters/Using_The_Jitsu_Client.md \
	chapters/Open_Source_Projects.md \
	chapters/Additional_Information.md \
	chapters/Databases.md 

API = chapters/Using_The_API.md 


HTML = $(MD:.md=.html)

all: book.html book.pdf book.md ReadMe.md API.md clear

regenerate: clean all
	git commit -a -m 'Regenerated book' && echo done

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
		--authors "Marak Squires" \
		--language en \
		--cover pages/cover.jpg

view: book.pdf
	open book.pdf

clean:
	rm -f book.*
	rm -f chapters/*.html

clear:
	rm -f chapters/*.html
	rm -f pages/index.html

.PHONY: view clean regenerate
