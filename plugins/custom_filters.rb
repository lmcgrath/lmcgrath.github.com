module CustomFilters
  def date_to_rfc822(date)
    date.strftime("%a, %d %b %Y %H:%M:%S %z")
  end
end

Liquid::Template.register_filter CustomFilters

