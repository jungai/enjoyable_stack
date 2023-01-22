.PHONY:	default

default:
	pnpm	install
	pnpm	prisma:generate
