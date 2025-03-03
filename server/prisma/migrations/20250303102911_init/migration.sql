-- CreateTable
CREATE TABLE "Box" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Box_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "id" SERIAL NOT NULL,
    "ratePerCubicM" DOUBLE PRECISION NOT NULL DEFAULT 472.41,
    "deliveryCharge" DOUBLE PRECISION NOT NULL DEFAULT 5.0,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);
