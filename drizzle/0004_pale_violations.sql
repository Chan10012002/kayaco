ALTER TABLE "product" ADD COLUMN "lgu_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_lgu_id_user_id_fk" FOREIGN KEY ("lgu_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
