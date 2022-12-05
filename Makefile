.PHONY:	default

default:
	yarn	install
	yarn	prisma:generate
