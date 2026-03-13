PORT ?= 3001

.PHONY: dev check run stop logs install backup restore backups

install:
	npm install

dev:
	./scripts/dev-start.sh $(PORT)

check:
	./scripts/dev-check.sh $(PORT)

run:
	./scripts/dev-run-all.sh $(PORT)

stop:
	pkill -f "next dev" || true

logs:
	tail -n 120 .dev-server.log

backup:
	./scripts/backup-files.sh

backups:
	ls -1 backups || true

# Usage: make restore BACKUP=backups/20260307_153900
restore:
	@if [ -z "$(BACKUP)" ]; then echo "Usage: make restore BACKUP=backups/<timestamp>"; exit 1; fi
	./scripts/restore-files.sh "$(BACKUP)"
