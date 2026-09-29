#!/usr/bin/env sh
set -eu

target=${1:-/home/anton-furs/apps}
minimum=${2:-10}
case "$minimum" in
  ''|*[!0-9]*) printf 'Minimum free percentage must be an integer.\n' >&2; exit 2 ;;
esac

df -Pk "$target" | awk -v minimum="$minimum" '
  NR == 2 {
    free_percent = 100 * $4 / $2
    printf "Free space on %s: %.2f%% (%s KiB available). Required: >%s%%.\n", $6, free_percent, $4, minimum
    if (free_percent <= minimum) exit 1
    checked = 1
  }
  END { if (NR < 2 || !checked) exit 1 }
'
