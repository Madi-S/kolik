"""I am a teapot

Revision ID: 3fc32c873072
Revises: 49a0a5e2fd03
Create Date: 2022-01-15 18:48:08.992649

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "3fc32c873072"
down_revision = "49a0a5e2fd03"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("post", schema=None) as batch_op:
        batch_op.add_column(sa.Column("image_uri", sa.String(), nullable=True))
        batch_op.drop_column("image")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("post", schema=None) as batch_op:
        batch_op.add_column(sa.Column("image", sa.VARCHAR(), nullable=True))
        batch_op.drop_column("image_uri")

    # ### end Alembic commands ###
