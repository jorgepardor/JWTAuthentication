"""empty message

Revision ID: 09676699c66b
Revises: 2807edd385a2
Create Date: 2022-03-14 17:47:56.649418

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '09676699c66b'
down_revision = '2807edd385a2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('username', sa.String(length=120), nullable=False))
    op.create_unique_constraint(None, 'user', ['username'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='unique')
    op.drop_column('user', 'username')
    # ### end Alembic commands ###
