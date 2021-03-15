import React, { forwardRef, Ref } from "react";
import Link, { LinkProps } from "next/link";
import { Button, ButtonProps } from "@material-ui/core";

const NextLink = ({ href, as, prefetch, locale, ...props }, ref) => (
  <Link href={href} as={as} prefetch={prefetch} locale={locale} passHref>
    <Button buttonRef={ref} {...props} />
  </Link>
);

export default forwardRef(NextLink);
