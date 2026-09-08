# Ardente Secondhand Shipping Setup

This file defines how shipping information should be recorded before products are listed.

## Book inventory shipping fields

The master `books.csv` now includes:

- `item_weight_oz` — weight of the book by itself in ounces
- `package_weight_oz` — final shipping weight including mailer/box and packing
- `package_length_in` — packaged length in inches
- `package_width_in` — packaged width in inches
- `package_height_in` — packaged height in inches
- `shipping_class` — shipping category/service eligibility
- `local_pickup` — `yes` or `no`
- `isbn` — useful for exact book identification and SEO
- `date_added` — date the listing was added

## Recommended weighing workflow

1. Put the unpackaged book on the scale and record its weight in ounces.
2. When practical, weigh the book in the actual mailer/box and record the final package weight.
3. Measure the finished package, not just the book.
4. Record length, width, and height in inches.
5. Set the shipping class. Books that qualify for book/media shipping can be marked `media-mail-eligible`; other products should use the appropriate parcel class.
6. Set `local_pickup` to `yes` or `no`.

## Data rule

Do not guess final shipping cost in the inventory file. Shipping cost should be calculated from the destination ZIP code plus the packaged weight and dimensions when a live carrier-rate or checkout system is connected.

## Example row

`B0001,Example Book,Example Author,Fiction,Paperback,Very Good,7.99,available,,Clean copy,12.4,14.2,10,7,1,media-mail-eligible,yes,9780000000000,2026-09-08`

The example is only a formatting example and is not real inventory.
