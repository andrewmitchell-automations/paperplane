# SPDX-License-Identifier: AGPL-3.0-only
# See the LICENSE file for details.

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("db", "0125_reset_project_deploy_board_identity"),
        ("db", "0155_backfill_page_mention_logs"),
    ]

    operations = []
