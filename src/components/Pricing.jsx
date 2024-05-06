import { CheckIcon } from "@heroicons/react/20/solid";

const tiers = [
  {
    name: "2 Seater Room",
    id: "tier-2",
    priceMonthly: "PKR 20000",
    features: [
      "WIFI",
      "3 time meals",
      "Daily room cleaning",
      "Laundry",
      "Generator backup",
      "24/7 security",
      "Air conditioning (on-demand with extra fee)",
    ],
    mostPopular: false,
  },
  {
    name: "3 Seater Room",
    id: "tier-3",
    priceMonthly: "PKR 16000",
    features: [
      "WIFI",
      "3 time meals",
      "Daily room cleaning",
      "Laundry",
      "Generator backup",
      "24/7 security",
      "Air conditioning (on-demand with extra fee)",
    ],
    mostPopular: true,
  },
  {
    name: "4 Seater Room",
    id: "tier-4",
    priceMonthly: "PKR 12000",
    features: [
      "WIFI",
      "3 time meals",
      "Daily room cleaning",
      "Laundry",
      "Generator backup",
      "24/7 security",
      "Air conditioning (on-demand with extra fee)",
    ],
    mostPopular: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Pricing() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-theme-primary">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pricing plans that are just right for you.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          We are currently offering 2, 3 and 4 person rooms. Our rooms are
          spacious and comfortable.
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8",
                tierIdx === 0 ? "lg:rounded-r-none" : "",
                tierIdx === tiers.length - 1 ? "lg:rounded-l-none" : "",
                "flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular ? "text-theme-primary" : "text-gray-900",
                      "text-lg font-semibold leading-8"
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-theme-primary/10 px-2.5 py-1 text-xs font-semibold leading-5 text-theme-primary">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {tier.priceMonthly}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    /month
                  </span>
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-theme-primary"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
